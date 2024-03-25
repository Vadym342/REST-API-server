import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

export function GetUserListAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get User list ',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(GetUserListResponse),
    ApiOkResponse({
      description: 'User list was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(GetUserListResponse),
        },
        example: validUserListResponse,
      },
    }),
  );
}
export class UserResponse {
  @ApiProperty({
    example: 'a87e37b5-09ac-447c-baf0-dfba9e224d3b',
    type: 'string',
    format: 'uuid',
    nullable: false,
  })
  id: string;

  @ApiProperty({
    example: 'ddsdfsf.bbb@gmail.com',
    type: 'string',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 200,
    type: 'number',
    format: 'float',
    nullable: false,
  })
  age: number;

  @ApiProperty({
    example: 'Harry',
    type: 'string',
    nullable: false,
  })
  firstName: string;

  @ApiProperty({
    example: 'Potter',
    type: 'string',
    nullable: false,
  })
  lastName: string;
}

export class GetUserListResponse {
  @ApiProperty({
    example: 1,
    type: 'integer',
  })
  total: number;

  @ApiProperty({
    type: () => [UserResponse],
  })
  data: UserResponse[];
}
export const validUserListResponse: GetUserListResponse = {
  total: 2,
  data: [
    {
      id: 'df467ffb-0a63-404c-92f9-b5b52108061f',
      age: 12,
      email: 'test1@total.com',
      firstName: 'test',
      lastName: 'test',
    },
    {
      id: 'ac636b9b-a948-4d3e-bae4-b08313504554',
      age: 22,
      email: 'test2@total.com',
      firstName: 'dsfsgsdg',
      lastName: 'bla',
    },
  ],
};
