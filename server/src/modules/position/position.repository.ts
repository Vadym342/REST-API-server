import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DATABASE_ERROR_CONTEXT, DatabaseException } from '@src/exceptions';

import { CreatePositionDto } from './dto/create-position.dto';
import { GetPositionResponseType } from './dto/get-one-position.response.dto';
import { GetPositionListResponseDto } from './dto/get-position-list.response.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionRepository extends Repository<Position> {
  private readonly logger = new Logger(PositionRepository.name);

  constructor(@InjectRepository(Position) repository: Repository<Position>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createOne(data: CreatePositionDto): Promise<void> {
    try {
      await this.save(data);
    } catch (error) {
      this.logger.log('Creating Position exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.POSITION_CREATE_ONE);
    }
  }

  async getOne(id: number): Promise<GetPositionResponseType> {
    try {
      return await this.findOne({ where: { id } });
    } catch (error) {
      this.logger.log('Selecting Position exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.POSITION_GET_ONE);
    }
  }

  async getAll(): Promise<GetPositionListResponseDto> {
    try {
      const skip = 0; //Change to Option from params
      const take = 10; //Change to Option from params
      const [data, total] = await this.findAndCount({
        select: {
          id: true,
          name: true,
        },
        take,
        skip,
      });

      return { total, data };
    } catch (error) {
      this.logger.log('Selecting Position exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.POSITION_GET_MANY);
    }
  }

  async updateOne(id: number, data: UpdatePositionDto): Promise<void> {
    try {
      await this.update(id, data);
    } catch (error) {
      this.logger.log('Updating Position exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.POSITION_UPDATE_ONE);
    }
  }

  async deleteOne(id: number): Promise<void> {
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.log('Deleting Position exception', error);

      throw new DatabaseException(error, DATABASE_ERROR_CONTEXT.POSITION_DELETE_ONE);
    }
  }
}
