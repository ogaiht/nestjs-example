import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {
  LoginResultDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignInDto
} from './dtos';
import { Public } from '../guards/public';
import { AuthenticationResultStatus } from './authentication-result-status';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description:
      'Authenticates the user and issues both access and refresh tokens',
    type: LoginResultDto
  })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<LoginResultDto> {
    const loginResult = await this.authenticationService.authenticate(
      signInDto.username,
      signInDto.password
    );
    if (loginResult.status === AuthenticationResultStatus.SUCCESS) {
      return {
        success: true,
        accessToken: loginResult.accessToken,
        refreshToken: loginResult.refreshToken
      };
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      };
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Issues a new Access token',
    type: RefreshTokenResponseDto
  })
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenRequest: RefreshTokenRequestDto
  ): Promise<RefreshTokenResponseDto> {
    const refreshResult = await this.authenticationService.createNewAccessToken(
      refreshTokenRequest.refreshToken
    );
    if (refreshResult.success) {
      return {
        success: true,
        accessToken: refreshResult.accessToken
      };
    } else {
      return { success: false };
    }
  }
}
