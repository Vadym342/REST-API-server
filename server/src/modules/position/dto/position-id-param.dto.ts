import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class PositionIdDto {
  @ApiProperty({
    name: 'id',
    type: 'number',
    required: true,
    example: '1',
    description: 'Position Id',
  })
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.POSITION_ID_IS_NOT_INT })
  id: number;
}
