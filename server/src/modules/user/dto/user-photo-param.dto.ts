import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

export class UserPhotoParamDto {
  @ApiProperty({
    name: 'photo',
    type: 'string',
    required: true,
    example: '1711292762966-image.jpeg',
    description: 'User photo',
  })
  @IsString({ context: VALIDATION_ERROR_CONTEXT.USER_PHOTO_IS_NOT_STRING })
  photo: string;
}
