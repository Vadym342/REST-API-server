import { Body, Controller, HttpCode, Delete, Get, HttpStatus, Logger, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreatePositionDto } from './dto/create-position.dto';
import { GetPositionResponseType } from './dto/get-one-position.response.dto';
import { GetPositionListResponseDto } from './dto/get-position-list.response.dto';
import { PositionIdDto } from './dto/position-id-param.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionValidatorService } from './services/position-validator.service';
import { PositionService } from './services/position.service';
import { DeletePositionAPIDocumentation } from './swagger/delete-position-documentation.decorator';
import { GetPositionAPIDocumentation } from './swagger/get-one-position-documentation.decorator';
import { GetPositionListAPIDocumentation } from './swagger/get-position-list-documentation.decorator';
import { PostPositionAPIDocumentation } from './swagger/post-position-documentation.decorator';
import { UpdatePositionAPIDocumentation } from './swagger/update-position-documentation.decorator';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  private readonly logger = new Logger(PositionController.name);
  constructor(
    private readonly positionService: PositionService,
    private readonly positionValidatorService: PositionValidatorService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @PostPositionAPIDocumentation()
  async createPosition(@Body() createPositionDto: CreatePositionDto): Promise<void> {
    this.logger.log('Creating Position');

    await this.positionService.createPosition(createPositionDto);
  }

  @Get()
  @GetPositionListAPIDocumentation()
  async getAllPositions(): Promise<GetPositionListResponseDto> {
    this.logger.log('Getting all Positions');

    return this.positionService.getAllPositions();
  }

  @Get(':id')
  @GetPositionAPIDocumentation()
  async getOnePosition(@Param() { id }: PositionIdDto): Promise<GetPositionResponseType> {
    this.logger.log('Getting one Position');

    await this.positionValidatorService.doesPositionExist(id);

    return this.positionService.getOnePosition(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdatePositionAPIDocumentation()
  async updatePosition(@Param() { id }: PositionIdDto, @Body() updatePositionDto: UpdatePositionDto): Promise<void> {
    this.logger.log('Updating Position');

    await this.positionValidatorService.doesPositionExist(id);

    await this.positionService.updatePosition(id, updatePositionDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeletePositionAPIDocumentation()
  async deletePosition(@Param() { id }: PositionIdDto): Promise<void> {
    this.logger.log('Deleting Position');

    await this.positionValidatorService.doesPositionExist(id);

    await this.positionService.deletePosition(id);
  }
}
