import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiOperation, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { API_BEARER_AUTH_TYPE } from '@src/constants/swagger';

export function GetPositionListAPIDocumentation(): MethodDecorator {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Position list ',
    }),
    ApiBearerAuth(API_BEARER_AUTH_TYPE),
    ApiExtraModels(GetPositionListResponse),
    ApiOkResponse({
      description: 'Position list was successfully got',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          $ref: getSchemaPath(GetPositionListResponse),
        },
        example: validPositionListResponse,
      },
    }),
  );
}
export class PositionResponse {
  @ApiProperty({
    example: '1',
    type: 'number',
    nullable: false,
  })
  id: number;

  @ApiProperty({
    example: 'Security',
    type: 'string',
    nullable: false,
  })
  name: string;
}

export class GetPositionListResponse {
  @ApiProperty({
    example: 1,
    type: 'integer',
  })
  total: number;

  @ApiProperty({
    type: () => [PositionResponse],
  })
  data: PositionResponse[];
}
export const validPositionListResponse: GetPositionListResponse = {
  total: 2,
  data: [
    {
      id: 1,
      name: 'Security',
    },
    {
      id: 2,
      name: 'Designer',
    },
  ],
};
