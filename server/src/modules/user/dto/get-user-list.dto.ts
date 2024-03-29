import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { SORT_ORDER } from '../constants/user.types';

export class GetListUsersDto {
  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.PAGINATION_PAGE_IS_INVALID })
  page: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.PAGINATION_COUNT_IS_INVALID })
  count: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Number of items to skip',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.PAGINATION_OFFSET_IS_INVALID })
  offset: number;

  @ApiProperty({
    required: false,
    enum: SORT_ORDER,
    default: SORT_ORDER.DESC,
    type: 'string',
  })
  @IsOptional()
  @IsEnum(SORT_ORDER, {
    context: VALIDATION_ERROR_CONTEXT.SORTING_DIRECTION_IS_NOT_IN_RANGE,
  })
  sortDirection: SORT_ORDER = SORT_ORDER.DESC;
}
