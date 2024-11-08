import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../database/repositories';
import { ProfileDto } from './dtos';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async getUserProfile(email: string): Promise<ProfileDto | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      return new ProfileDto(user.name, user.email, '');
    }
    return null;
  }
}
