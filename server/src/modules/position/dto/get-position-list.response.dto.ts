import { ApiProperty } from '@nestjs/swagger';

export class PositionListType {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'Security' })
  name: string;
}

export class GetPositionListResponseDto {
  total: number;
  data: PositionListType[];
}
