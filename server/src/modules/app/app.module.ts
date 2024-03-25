import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PositionModule } from '@modules/position/position.module';
import { UserModule } from '@modules/user/user.module';

import { CommonModule } from '../common/common.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule.forRoot(), UserModule, PositionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
