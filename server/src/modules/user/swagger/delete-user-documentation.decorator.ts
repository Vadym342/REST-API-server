import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

const { USER_ENTITY_NOT_FOUND, USER_ID_IS_NOT_UUID } = VALIDATION_ERROR_CONTEXT;

export function DeleteUserAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete User',
      description: 'Delete User',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'User was successfully deleted',
    }),
    ApiThrowExceptions({
      '400': {
        errors: [USER_ID_IS_NOT_UUID],
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
