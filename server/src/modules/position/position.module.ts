import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Position } from './entities/position.entity';
import { PositionController } from './position.controller';
import { PositionRepository } from './position.repository';
import { PositionValidatorService } from './services/position-validator.service';
import { PositionService } from './services/position.service';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService, PositionValidatorService, PositionRepository],
  exports: [PositionService],
})
export class PositionModule {}
