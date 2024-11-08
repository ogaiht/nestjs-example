import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User name',
    maxLength: 100,
    required: false
  })
  name?: string;
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    maxLength: 250,
    required: false
  })
  email?: string;
}
