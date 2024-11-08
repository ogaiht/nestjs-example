import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'New access token'
  })
  accessToken?: string;
  @ApiProperty({
    description: 'Indicates if the token refresh has succeeded or not'
  })
  success: boolean;
  @ApiProperty({
    description: 'Message regarding the token refresh'
  })
  message?: string;
}
