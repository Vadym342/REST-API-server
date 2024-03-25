import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class UserEmailParamDto {
  @ApiProperty({
    name: 'email',
    type: 'string',
    required: true,
    example: 'abcd@gmail.com',
    description: 'User email',
  })
  @IsEmail()
  @MaxLength(96, { context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_IS_NOT_STRING })
  email: string;
}
