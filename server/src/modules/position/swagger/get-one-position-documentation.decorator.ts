import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, getSchemaPath } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import { PositionResponse } from './get-position-list-documentation.decorator';

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
  );
}
export const validPositionListResponse: PositionResponse = {
  id: 1,
  name: 'Security',
};
