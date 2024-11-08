import { IsString } from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseUserDto {
  @IsString()
  @ApiProperty({
    description: 'User Password',
    maxLength: 50
  })
  password: string;
}
