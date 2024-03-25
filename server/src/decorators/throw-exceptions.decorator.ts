import { applyDecorators, HttpStatus } from '@nestjs/common';

import { ExceptionError } from '@src/exceptions/types/exception';
import { api4xxDecoratorMap, mapExceptionErrorsToOpenApiSchema } from '@src/utils/exception-error-mappers';

type UsedExceptionStatusCodes =
  | HttpStatus.BAD_REQUEST
  | HttpStatus.NOT_FOUND
  | HttpStatus.CONFLICT
  | HttpStatus.UNSUPPORTED_MEDIA_TYPE
  | HttpStatus.UNPROCESSABLE_ENTITY
  | HttpStatus.FORBIDDEN;

type ApiResponseOptions = { description?: string; errors: ExceptionError[] };

type ApiThrowExceptionOptions = Partial<Record<UsedExceptionStatusCodes, ApiResponseOptions>>;

export function ApiThrowExceptions(options: ApiThrowExceptionOptions): MethodDecorator {
  const apiResponseDecorators: MethodDecorator[] = Object.entries(options).map((throwable) => {
    const [statusCode, { errors, description }] = throwable;
    const { apiResponse, name, defaultDescription } = api4xxDecoratorMap[+statusCode];

    return apiResponse({
      description: description || defaultDescription,
      schema: mapExceptionErrorsToOpenApiSchema(+statusCode, name, errors),
    });
  });

  return applyDecorators(...apiResponseDecorators);
}
