import * as fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import * as sharp from 'sharp';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { UnprocessableEntityException } from '@src/exceptions/unprocessable-entity.exception';
import { AWSUtil } from '@src/utils/aws';

@Injectable()
export class FileManagerService {
  private readonly logger = new Logger(FileManagerService.name);

  async uploadFile(filePath: string, fileName: string, fileType: string): Promise<string> {
    this.logger.log('Uploading file to S3');

    try {
      const base64 = fs.readFileSync(filePath);

      await sharp(base64)
        .resize({
          width: 70,
          height: 70,
        })
        .toBuffer()
        .then((data) => {
          //eslint-disable-next-line @typescript-eslint/no-misused-promises
          fs.writeFile(filePath, data, 'binary', async (error) => {
            if (!error) {
              await AWSUtil.uploadToS3(filePath, fileName, fileType);

              fs.unlinkSync(filePath);
            } else {
              throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.S3_FILE_UPLOAD_ERROR);
            }
          });
        });

      return fileName;
    } catch (err) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.S3_FILE_UPLOAD_PHOTO_ERROR);
    }
  }
}
