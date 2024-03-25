import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';
import { NotFoundException } from '@src/exceptions/not-found.exception';

import { Position } from '../entities/position.entity';

@Injectable()
export class PositionValidatorService {
  constructor(@InjectRepository(Position) private readonly PositionRepository: Repository<Position>) {}
  async doesPositionExist(id: number): Promise<boolean> {
    let Position = {};

    if (id) {
      Position = await this.doesPositionEntityExistById(id);
    }

    if (!Position) {
      throw new NotFoundException(VALIDATION_ERROR_CONTEXT.POSITION_ENTITY_NOT_FOUND);
    }

    return true;
  }

  private async doesPositionEntityExistById(id: number): Promise<boolean> {
    return await this.PositionRepository.exists({ where: { id } });
  }
}
