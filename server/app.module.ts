import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { AuthMiddleware } from '@src/middleware/auth.middleware';
import { SocketService } from '@src/socket/socket.service';

import { AuthModule } from '@modules/auth/auth.module';
import { AuthService } from '@modules/auth/auth.service';
import { CommonModule } from '@modules/common/common.module';
import { GuestModule } from '@modules/guest/guest.module';
import { UserController } from '@modules/user/user.controller';
import { UserModule } from '@modules/user/user.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CommonModule.forRoot(), UserModule, AuthModule, GuestModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, SocketService],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).exclude({ path: 'user', method: RequestMethod.POST }, 'guest/(.*)').forRoutes(UserController);
  }
}
