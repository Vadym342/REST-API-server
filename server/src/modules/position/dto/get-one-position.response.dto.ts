import { ApiProperty } from '@nestjs/swagger';

export class GetPositionResponseType {
  @ApiProperty({ example: '1' })
  id: number;

  @ApiProperty({ example: 'Security' })
  name: string;
}
