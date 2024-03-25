import { Injectable, PipeTransform } from '@nestjs/common';

import { FILE_MIME_TYPES, PHOTO_IMPORT_MAX_FILE_SIZE_BYTES } from '@src/constants/constants';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { UnprocessableEntityException } from '@src/exceptions/unprocessable-entity.exception';

@Injectable()
export class PhotoImportValidationPipe implements PipeTransform {
  transform(photo: Express.Multer.File): Express.Multer.File {
    if (!photo) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_PIPE_NO_FILE);
    }

    if (photo.mimetype !== FILE_MIME_TYPES.jpeg || photo.mimetype !== FILE_MIME_TYPES.jpg) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_PIPE_INVALID_MIMETYPE);
    }

    if (photo.size > PHOTO_IMPORT_MAX_FILE_SIZE_BYTES) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_PIPE_MAX_SIZE);
    }

    return photo;
  }
}
