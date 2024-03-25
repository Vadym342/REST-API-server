import { ApiProperty } from '@nestjs/swagger';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { IsUUID } from 'class-validator';

export class UserIdDto {
  @ApiProperty({
    name: 'id',
    type: 'string',
    format: 'uuid',
    required: true,
    example: 'ca8ce9a8-005c-4eef-8466-034422b63b81',
    description: 'User Id',
  })
  @IsUUID(4, {context: VALIDATION_ERROR_CONTEXT.USER_ID_IS_NOT_UUID})
  id: string;
}
