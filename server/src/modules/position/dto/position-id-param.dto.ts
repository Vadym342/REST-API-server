import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PositionIdDto {
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    example: '1',
    description: 'Position Id',
  })
  @IsInt()
  id: number;
}
