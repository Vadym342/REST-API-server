import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule.forRoot(),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
