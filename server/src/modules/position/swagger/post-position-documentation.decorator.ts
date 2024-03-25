import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { CreatePositionDto } from '../dto/create-position.dto';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

const { POSITION_NAME_IS_NOT_STRING, POSITION_NAME_LENGTH_INVALID, POSITION_ENTITY_ALREADY_EXIST } = VALIDATION_ERROR_CONTEXT;

export function PostPositionAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Position',
      description: `
        <p>Create Position</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'Position successfully created.',
    }),
    ApiThrowExceptions({
      '400': {
        errors: [POSITION_NAME_IS_NOT_STRING, POSITION_NAME_LENGTH_INVALID],
        description: 'Please, make sure that you follow the contract and pass only valid properties and values',
      },
    }),
    ApiThrowExceptions({
      '409': {
        errors: [POSITION_ENTITY_ALREADY_EXIST],
        description: 'Please, make sure that input data is correct',
      },
    }),
    ApiBody({
      type: CreatePositionDto,
      examples: {
        validPositionBodyExample: {
          value: validPositionBodyExample,
        },
      },
    }),
  );
}

export const validPositionBodyExample: CreatePositionDto = {
  name: 'Lawyer',
};
