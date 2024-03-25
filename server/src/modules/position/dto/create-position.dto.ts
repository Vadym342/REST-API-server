import { IsString, MaxLength } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class CreatePositionDto {
  @MaxLength(50, { context: VALIDATION_ERROR_CONTEXT.POSITION_NAME_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.POSITION_NAME_IS_NOT_STRING })
  name: string;
}
