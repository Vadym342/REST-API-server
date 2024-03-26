import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';
import { ApiThrowExceptions } from '@src/decorators/throw-exceptions.decorator';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

const { AUTH_JWT_UNAUTHORIZED } = VALIDATION_ERROR_CONTEXT;

export function GetProfileAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Check if the user in the system and get user info',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiOkResponse({
      description: 'User in the system and user info were successfully got',
      schema: {
        type: 'array',
        example: validProfileResponse,
      },
    }),
    ApiThrowExceptions({
      '403': {
        errors: [AUTH_JWT_UNAUTHORIZED],
        description: 'Please, make sure that your credentials are correct',
      },
    }),
  );
}
export const validProfileResponse = {
  id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
  email: 'test1@total.com',
  token: 'token',
};
