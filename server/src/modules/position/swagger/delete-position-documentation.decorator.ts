import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

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
  );
}
