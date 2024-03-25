import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

const { POSITION_ID_IS_NOT_INT, POSITION_ENTITY_NOT_FOUND } = VALIDATION_ERROR_CONTEXT;

export function DeletePositionAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Position',
      description: 'Delete Position',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'Position was successfully deleted',
    }),
    ApiThrowExceptions({
      '400': {
        errors: [POSITION_ID_IS_NOT_INT],
        description: 'Please, make sure that you follow the contract and pass only valid properties and values',
      },
    }),
    ApiThrowExceptions({
      '404': {
        errors: [POSITION_ENTITY_NOT_FOUND],
        description: 'Please, make sure that input data are correct',
      },
    }),
  );
}
