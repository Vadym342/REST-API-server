import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { loggerConfig } from 'src/configs/logger.config';
import { getDataSourceConfig } from 'src/database/ormconfig';

@Global()
@Module({})
export class CommonModule {
  static forRoot(): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        LoggerModule.forRoot(loggerConfig),
        TypeOrmModule.forRootAsync({
          inject: [PinoLogger],
          useFactory: (logger) => getDataSourceConfig(logger),
        }),
      ],
      providers: [],
      exports: [],
    };
  }
}
