import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { PositionModule } from '@modules/position/position.module';
import { UserModule } from '@modules/user/user.module';

import { CommonModule } from '../common/common.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@modules/auth/auth.service';
import { AuthMiddleware } from '@src/middleware/auth.middleware';
import { UserController } from '@modules/user/user.controller';
import { PositionController } from '@modules/position/position.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule.forRoot(), UserModule, PositionModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.GET },
        { path: 'position', method: RequestMethod.GET },
      )
      .forRoutes(UserController, PositionController);
  }
}
