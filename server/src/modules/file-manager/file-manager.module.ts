import { Module } from '@nestjs/common';

import { FileManagerService } from './file-manager.service';
import { FileManagerController } from './file-manger.controller';

@Module({
  controllers: [FileManagerController],
  providers: [FileManagerService],
})
export class FileManagerModule {}
