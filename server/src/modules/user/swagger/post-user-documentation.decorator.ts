import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { CreateUserDto } from '../dto/create-user.dto';

const {
  POSITION_ENTITY_NOT_FOUND,
  USER_ENTITY_ALREADY_EXIST,
  USER_NAME_IS_NOT_STRING,
  USER_NAME_LENGTH_INVALID,
  USER_EMAIL_LENGTH_INVALID,
  USER_EMAIL_IS_NOT_STRING,
  USER_PHONE_LENGTH_INVALID,
  USER_PHONE_INVALID,
  USER_PASSWORD_LENGTH_INVALID,
  USER_PASSWORD_IS_NOT_STRING,
  USER_PHOTO_IS_NOT_STRING,
  FILE_UPLOAD_PHOTO_PIPE_NO_FILE,
  FILE_UPLOAD_PHOTO_PIPE_INVALID_MIMETYPE,
  FILE_UPLOAD_PHOTO_PIPE_MAX_SIZE,
  FILE_UPLOAD_PHOTO_SAVING_ERROR,
} = VALIDATION_ERROR_CONTEXT;

export function PostUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create User',
      description: `
        <p>Create User</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'User successfully created.',
    }),
    ApiThrowExceptions({
      '400': {
        errors: [
          USER_NAME_IS_NOT_STRING,
          USER_NAME_LENGTH_INVALID,
          USER_EMAIL_LENGTH_INVALID,
          USER_EMAIL_IS_NOT_STRING,
          USER_PHONE_LENGTH_INVALID,
          USER_PHONE_INVALID,
          USER_PASSWORD_LENGTH_INVALID,
          USER_PASSWORD_IS_NOT_STRING,
          USER_PHOTO_IS_NOT_STRING,
        ],
        description: 'Please, make sure that you follow the contract and pass only valid properties and values',
      },
    }),
    ApiThrowExceptions({
      '404': {
        errors: [POSITION_ENTITY_NOT_FOUND],
        description: 'Please, make sure that input data are correct',
      },
    }),
    ApiThrowExceptions({
      '409': {
        errors: [USER_ENTITY_ALREADY_EXIST],
        description: 'Please, make sure that input data is correct',
      },
    }),
    ApiThrowExceptions({
      '422': {
        errors: [
          FILE_UPLOAD_PHOTO_PIPE_NO_FILE,
          FILE_UPLOAD_PHOTO_PIPE_INVALID_MIMETYPE,
          FILE_UPLOAD_PHOTO_PIPE_MAX_SIZE,
          FILE_UPLOAD_PHOTO_SAVING_ERROR,
        ],
        description: 'Please, make sure that input file is correct',
      },
    }),
    ApiBody({
      type: CreateUserDto,
      examples: {
        validUserBodyExample: {
          value: validUserBodyExample,
        },
      },
    }),
  );
}

export const validUserBodyExample: Omit<CreateUserDto, 'photo'> = {
  email: 'test.email@gmail.com',
  name: 'Harry',
  positionId: 1,
  phone: '+380936548653',
  password: 'akcio',
};
