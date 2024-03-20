import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { Logger } from 'nestjs-pino';

import { AppModule } from './modules/app/app.module';

config();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));
  app.enableCors();

  await app.listen(Number(process.env.APPLICATION_PORT) || 3030);
}

bootstrap();
