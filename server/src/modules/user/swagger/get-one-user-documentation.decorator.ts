import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { UserResponse } from './get-user-list-documentation.decorator';

const { USER_ENTITY_NOT_FOUND, USER_EMAIL_IS_NOT_STRING, USER_EMAIL_LENGTH_INVALID } = VALIDATION_ERROR_CONTEXT;

export function GetUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get one User',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(UserResponse),
    ApiOkResponse({
      description: 'User was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(UserResponse),
        },
        example: validUserListResponse,
      },
    }),
    ApiThrowExceptions({
      '400': {
        errors: [USER_EMAIL_LENGTH_INVALID, USER_EMAIL_IS_NOT_STRING],
        description: 'Please, make sure that you follow the contract and pass only valid properties and values',
      },
    }),
    ApiThrowExceptions({
      '404': {
        errors: [USER_ENTITY_NOT_FOUND],
        description: 'Please, make sure that input data are correct',
      },
    }),
  );
}
export const validUserListResponse: UserResponse = {
  id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
  age: 12,
  email: 'test1@total.com',
  firstName: 'test',
  lastName: 'test',
};
