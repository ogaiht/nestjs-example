import { ApiProperty } from '@nestjs/swagger';
import { BaseUserDto } from './base-user.dto';

export class UserDto extends BaseUserDto {
  @ApiProperty()
  id: number;
}
