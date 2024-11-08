import { ApiProperty } from '@nestjs/swagger';

export class ExecutedDto {
  @ApiProperty()
  readonly success: boolean;
  @ApiProperty()
  readonly message?: string | null;
}
