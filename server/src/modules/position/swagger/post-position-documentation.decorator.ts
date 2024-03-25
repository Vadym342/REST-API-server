import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { CreatePositionDto } from '../dto/create-position.dto';

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
