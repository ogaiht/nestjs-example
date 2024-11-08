import { ApiProperty } from '@nestjs/swagger';

export class CreatedDto {
  @ApiProperty({
    description: 'New id of created resource.'
  })
  id: number;
}
