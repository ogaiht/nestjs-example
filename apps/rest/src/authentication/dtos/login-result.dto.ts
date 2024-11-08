import { ApiProperty } from '@nestjs/swagger';

export class LoginResultDto {
  @ApiProperty({
    description: 'Access token'
  })
  accessToken?: string;
  @ApiProperty({
    description: 'Refresh token'
  })
  refreshToken?: string;
  @ApiProperty({
    description: 'Indicates if the login succeeded or not'
  })
  success: boolean;
  @ApiProperty({
    description: 'Message regarding the login'
  })
  message?: string;
}
