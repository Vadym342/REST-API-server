import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { LoginDto } from '../dto/login.dto';

export function LoginAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Login User',
      description: `
        <p>Login to get authorization token to work with API</p>
      `,
    }),
    ApiCreatedResponse({
      description: 'Login successful',
    }),
    ApiBody({
      type: LoginDto,
      examples: {
        validUserBodyExample: {
          value: validLoginBodyExample,
        },
      },
    }),
  );
}

export const validLoginBodyExample: LoginDto = {
  email: 'test.email@gmail.com',
  password: 'akcio',
};
