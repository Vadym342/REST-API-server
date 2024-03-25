import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { UpdatePositionDto } from '../dto/update-position.dto';

const { POSITION_ID_IS_NOT_INT, POSITION_ENTITY_NOT_FOUND } = VALIDATION_ERROR_CONTEXT;

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
