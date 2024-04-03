import { accessSync } from 'fs';
import { join, extname } from 'path';

import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import type { Response } from 'express';
import { Observable, of } from 'rxjs';
import * as sharp from 'sharp';
import { v4 as uuid } from 'uuid';

import { PHOTO_HEIGHT, PHOTO_WIDTH, pathToSave } from '@src/constants/constants';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

@Injectable()
export class UserFileService {
  private readonly logger = new Logger(UserFileService.name);
  async uploadUserPhotoLocal(file: Express.Multer.File): Promise<string> {
    try {
      accessSync(pathToSave);
      const filename = `${uuid()}${extname(file.originalname)}`;

      await sharp(file.buffer)
        .jpeg({ quality: 70 })
        .resize({
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
          fit: 'fill',
        })
        .toFile(join(pathToSave, filename));

      return filename;
    } catch (error) {
      this.logger.log('Save file exception', error);

      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_SAVING_ERROR);
    }
  }

  async getUserPhotoLocal(fileName: string, res: Response): Promise<Observable<void>> {
    return of(res.sendFile(join(process.cwd(), `${pathToSave}/` + fileName)));
  }
}
