import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Position } from '@modules/position/entities/position.entity';
import { PositionValidatorService } from '@modules/position/services/position-validator.service';

import { User } from './entities/user.entity';
import { UserFileService } from './services/user-file.service';
import { UserValidatorService } from './services/user-validator.service';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Position])],
  controllers: [UserController],
  providers: [UserService, UserFileService, UserValidatorService, UserRepository, PositionValidatorService],
  exports: [UserService],
})
export class UserModule {}
