import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config as s3Bucket } from 'aws-sdk';
import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';

import { s3BucketConfig } from './configs/s3-bucket.config';
import { globalExceptionFilters } from './exceptions';
import { AppModule } from './modules/app/app.module';
import { globalValidationPipe } from './pipe/global-validation.pipe';
import { useSwagger } from './utils/swagger';

config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  useSwagger(app);
  s3Bucket.update(s3BucketConfig);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(...globalExceptionFilters);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.enableCors();

  await app.listen(Number(process.env.APPLICATION_PORT) || 3030);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
