import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { PositionResponse } from './get-position-list-documentation.decorator';

const { POSITION_ID_IS_NOT_INT, POSITION_ENTITY_NOT_FOUND } = VALIDATION_ERROR_CONTEXT;

export function GetPositionAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get one Position',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(PositionResponse),
    ApiOkResponse({
      description: 'Position was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(PositionResponse),
        },
        example: validPositionListResponse,
      },
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
export const validPositionListResponse: PositionResponse = {
  id: 1,
  name: 'Security',
};
