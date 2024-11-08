import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class BaseUserDto {
  @IsString()
  @ApiProperty({
    description: 'User name',
    maxLength: 250
  })
  name: string;
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    maxLength: 250
  })
  email: string;
}
