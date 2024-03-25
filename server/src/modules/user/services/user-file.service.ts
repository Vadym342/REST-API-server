import { accessSync } from 'fs';
import { parse, join } from 'path';

import { Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import type { Response } from 'express';
import { Observable, of } from 'rxjs';
import * as sharp from 'sharp';

import { pathToSave } from '@src/constants/constants';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

@Injectable()
export class UserFileService {
  private readonly logger = new Logger(UserFileService.name);
  async uploadUserPhoto(file: Express.Multer.File): Promise<string> {
    // S3 bucket
    try {
      accessSync(pathToSave);
      const imageType = file.mimetype.split('/')[1];
      const originalName = parse(file.originalname).name;
      const filename = Date.now() + '-' + originalName + `.${imageType}`;

      await sharp(file.buffer)
        .jpeg({ quality: 70 })
        .resize({
          width: 70,
          height: 70,
          fit: 'fill',
        })
        .toFile(join(pathToSave, filename));

      return filename;
    } catch (error) {
      this.logger.log('Save file exception', error);

      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_SAVING_ERROR);
    }
  }

  async getUserPhoto(fileName: string, res: Response): Promise<Observable<void>> {
    return of(res.sendFile(join(process.cwd(), `${pathToSave}/` + fileName)));
  }
}
