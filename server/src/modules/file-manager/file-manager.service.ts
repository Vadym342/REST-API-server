import * as fs from 'fs';

import { Injectable, Logger } from '@nestjs/common';
import { AWSError, S3 } from 'aws-sdk';
import * as sharp from 'sharp';

import { PHOTO_HEIGHT, PHOTO_WIDTH } from '@src/constants/constants';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { UnprocessableEntityException } from '@src/exceptions/unprocessable-entity.exception';
import { AWSUtil } from '@src/utils/aws';

import 'dotenv/config';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class FileManagerService {
  private readonly logger = new Logger(FileManagerService.name);

  async uploadFileToS3(filePath: string, fileName: string, fileType: string): Promise<string> {
    this.logger.log('Uploading file to S3');

    try {
      const base64 = fs.readFileSync(filePath);

      await sharp(base64)
        .resize({
          width: PHOTO_WIDTH,
          height: PHOTO_HEIGHT,
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

  async deleteFile(fileKey: string): Promise<PromiseResult<S3.DeleteObjectOutput, AWSError>> {
    const s3 = new S3();

    try {
      return await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        })
        .promise();
    } catch (err) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.S3_DELETE_FILE_ERROR);
    }
  }

  async getFile(fileKey: string): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    const s3 = new S3();

    try {
      return await s3
        .getObject({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
        })
        .promise();
    } catch (err) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.S3_GET_FILE_ERROR);
    }
  }
}
