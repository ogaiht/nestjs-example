import { ApiProperty } from '@nestjs/swagger';

export class AssignRole {
  @ApiProperty()
  roleId: number;
}
