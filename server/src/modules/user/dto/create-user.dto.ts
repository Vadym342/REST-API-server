import { IsEmail, IsInt, IsString, MaxLength, MinLength } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(96, { context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_EMAIL_IS_NOT_STRING })
  email: string;

  @Transform(({ value }) => Number(value))
  @IsInt({ context: VALIDATION_ERROR_CONTEXT.USER_POSITION_ID_IS_NOT_INT })
  positionId: number;

  @MaxLength(60, { context: VALIDATION_ERROR_CONTEXT.USER_NAME_LENGTH_INVALID })
  @MinLength(2, { context: VALIDATION_ERROR_CONTEXT.USER_NAME_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_NAME_IS_NOT_STRING })
  name: string;

  @MaxLength(13, { context: VALIDATION_ERROR_CONTEXT.USER_PHONE_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_PHONE_INVALID })
  phone: string;

  @MaxLength(20, { context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_LENGTH_INVALID })
  @MinLength(5, { context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_LENGTH_INVALID })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_PASSWORD_IS_NOT_STRING })
  password: string;

  photo: string;
}
