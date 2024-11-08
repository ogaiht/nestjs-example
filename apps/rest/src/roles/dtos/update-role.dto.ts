import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 100,
    description: 'Role name',
    required: false
  })
  @IsString()
  @Length(3, 100)
  name?: string;
  @ApiProperty({
    minLength: 0,
    maxLength: 250,
    description: 'Description about the Role',
    required: false
  })
  @IsString()
  @Length(0, 250)
  description?: string;
}
