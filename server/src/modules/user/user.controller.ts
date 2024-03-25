import {
  Body,
  Controller,
  HttpCode,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import * as multer from 'multer';
import { Observable } from 'rxjs';

import { PHOTO_IMPORT_MAX_FILE_SIZE_BYTES } from '@src/constants/constants';
import { VALIDATION_ERROR_CONTEXT } from '@src/exceptions';

import { PositionValidatorService } from '@modules/position/services/position-validator.service';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUserResponseType } from './dto/get-one-user.response.dto';
import { GetUserListResponseDto } from './dto/get-user-list.response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEmailParamDto } from './dto/user-email-param.dto';
import { UserIdDto } from './dto/user-id-param.dto';
import { UserPhotoParamDto } from './dto/user-photo-param.dto';
import { UserFileService } from './services/user-file.service';
import { UserValidatorService } from './services/user-validator.service';
import { UserService } from './services/user.service';
import { DeleteUserAPIDocumentation } from './swagger/delete-user-documentation.decorator';
import { GetUserAPIDocumentation } from './swagger/get-one-user-documentation.decorator';
import { GetUserListAPIDocumentation } from './swagger/get-user-list-documentation.decorator';
import { PostUserAPIDocumentation } from './swagger/post-user-documentation.decorator';
import { UpdateUserAPIDocumentation } from './swagger/update-user-documentation.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(
    private readonly userService: UserService,
    private readonly userFileService: UserFileService,
    private readonly userValidatorService: UserValidatorService,
    private readonly positionValidatorService: PositionValidatorService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: multer.memoryStorage(),
      limits: { files: 1, fieldSize: PHOTO_IMPORT_MAX_FILE_SIZE_BYTES },
    }),
  )
  @PostUserAPIDocumentation()
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: PHOTO_IMPORT_MAX_FILE_SIZE_BYTES }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ], // PhotoImportValidationPipe
      }),
    )
    photo: Express.Multer.File,
  ): Promise<void> {
    this.logger.log('Creating User');

    const fileName = await this.userFileService.uploadUserPhoto(photo);

    if (!fileName) {
      throw new UnprocessableEntityException(VALIDATION_ERROR_CONTEXT.FILE_UPLOAD_PHOTO_SAVING_ERROR);
    }

    createUserDto.photo = fileName;

    await this.positionValidatorService.doesPositionExist(createUserDto.positionId);
    await this.userValidatorService.doesUserAlreadyCreated(createUserDto.email);

    return this.userService.createUser(createUserDto);
  }

  @Get('user-photo/:photo')
  async getUserPhoto(@Param() { photo }: UserPhotoParamDto, @Res() res: Response): Promise<Observable<void>> {
    return this.userFileService.getUserPhoto(photo, res);
  }

  @Get()
  @GetUserListAPIDocumentation()
  async getAllUsers(): Promise<GetUserListResponseDto> {
    this.logger.log('Getting all Users');

    return this.userService.getAllUsers();
  }

  @Get(':email')
  @GetUserAPIDocumentation()
  async getOneUser(@Param() { email }: UserEmailParamDto): Promise<GetUserResponseType> {
    this.logger.log('Getting one User');

    await this.userValidatorService.doesUserExist(null, email);

    return this.userService.getOneUser(email);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UpdateUserAPIDocumentation()
  async updateUser(@Param() { id }: UserIdDto, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    this.logger.log('Updating User');

    await this.userValidatorService.doesUserExist(id);

    await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @DeleteUserAPIDocumentation()
  async deleteUser(@Param() { id }: UserIdDto): Promise<void> {
    this.logger.log('Deleting User');

    await this.userValidatorService.doesUserExist(id);

    await this.userService.deleteUser(id);
  }
}
