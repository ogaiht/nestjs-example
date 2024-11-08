import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class RoleDto {
  @ApiProperty()
  @IsNumber()
  id: number;
  @IsString()
  @ApiProperty()
  @Length(3, 100)
  name: string;
  @IsString()
  @ApiProperty()
  @Length(0, 250)
  description: string;
}
