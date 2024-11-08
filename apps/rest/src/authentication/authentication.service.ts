import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../database/repositories';
import {
  AuthenticationResult,
  RefreshTokenResult
} from './authentication-result';
import { AuthenticationResultStatus } from './authentication-result-status';
import { JwtService } from '@nestjs/jwt';
import { User, UserRefresh } from './user';
import { PasswordService } from '../password';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject()
    private readonly userRepository: UsersRepository,
    @Inject()
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(
    email: string,
    password: string
  ): Promise<AuthenticationResult> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return { status: AuthenticationResultStatus.DOES_NOT_EXIST };
    } else if (
      !(await this.passwordService.verifyPassword(
        {
          hash: user.passwordHash,
          salt: user.passwordSalt,
          iterations: user.passwordInterations
        },
        password
      ))
    ) {
      return { status: AuthenticationResultStatus.INVALID_PASSWORD };
    } else {
      const contextUser: User = {
        username: user.email,
        claims: [
          {
            name: 'permissions',
            value: [
              'roles:list',
              'roles:get',
              'roles:create',
              'roles:update',
              'roles:delete',
              'users:list',
              'users:get',
              'users:create',
              'users:update',
              'users:delete',
              'profile:mine'
            ]
          }
        ]
      };
      const accessToken = await this.jwtService.signAsync(contextUser);
      const refreshUser: UserRefresh = {
        sub: user.email
      };
      const refreshToken = await this.jwtService.signAsync(refreshUser, {
        expiresIn: '7d'
      });
      return {
        status: AuthenticationResultStatus.SUCCESS,
        accessToken,
        refreshToken
      };
    }
  }

  async createNewAccessToken(
    refreshToken: string
  ): Promise<RefreshTokenResult> {
    const data = this.jwtService.decode<User>(refreshToken);
    if (data) {
      const user = await this.userRepository.findByEmail(data.username);
      if (user) {
        const accessToken = await this.jwtService.signAsync(data);
        return {
          success: true,
          accessToken
        };
      }
    }
    return { success: false };
  }
}
