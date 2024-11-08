import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly role: string;
  constructor(name: string, email: string, role: string) {
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
