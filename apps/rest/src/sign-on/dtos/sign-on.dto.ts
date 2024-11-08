import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignOnDto {
  @IsString()
  @ApiProperty()
  name: string;
  @IsStrongPassword()
  @ApiProperty()
  password: string;
  @IsEmail()
  @ApiProperty()
  email: string;
}
