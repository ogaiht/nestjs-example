import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Username for authetication',
    minLength: 3,
    maxLength: 100
  })
  @IsString()
  @Length(3, 100)
  username: string;
  @ApiProperty({
    description: 'Password for authetication',
    minLength: 15,
    maxLength: 50
  })
  @IsString()
  @Length(12, 50)
  password: string;
}
