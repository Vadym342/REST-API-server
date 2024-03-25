import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

import { UpdatePositionDto } from '../dto/update-position.dto';

export function UpdatePositionAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Position',
      description: 'Update Position',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiNoContentResponse({
      description: 'Position was successfully updated',
    }),
    ApiBody({
      type: UpdatePositionDto,
      examples: {
        validPositionResponse: {
          summary: 'Position updates ',
          value: validPositionResponse,
        },
      },
    }),
  );
}

const validPositionResponse: UpdatePositionDto = {
  name: 'Content manager',
};
