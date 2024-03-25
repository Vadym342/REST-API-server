import { Injectable, Logger } from '@nestjs/common';

import { CreatePositionDto } from '../dto/create-position.dto';
import { GetPositionResponseType } from '../dto/get-one-position.response.dto';
import { GetPositionListResponseDto } from '../dto/get-position-list.response.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';
import { PositionRepository } from '../position.repository';

@Injectable()
export class PositionService {
  private readonly logger = new Logger(PositionService.name);
  constructor(private readonly PositionEntityRepository: PositionRepository) {}

  async createPosition(data: CreatePositionDto): Promise<void> {
    this.logger.log('Creating new Position');

    await this.PositionEntityRepository.createOne(data);
  }

  async getOnePosition(id: number): Promise<GetPositionResponseType> {
    this.logger.log('Getting Position');

    return this.PositionEntityRepository.getOne(id);
  }

  async getAllPositions(): Promise<GetPositionListResponseDto> {
    this.logger.log('Getting Position List');

    return this.PositionEntityRepository.getAll();
  }

  async updatePosition(id: number, data: UpdatePositionDto): Promise<void> {
    this.logger.log('Updating Position');

    return this.PositionEntityRepository.updateOne(id, {
      name: data.name,
    });
  }

  async deletePosition(id: number): Promise<void> {
    this.logger.log('Deleting Position');

    return this.PositionEntityRepository.deleteOne(id);
  }
}
