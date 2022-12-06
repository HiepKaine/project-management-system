import {
  DynamicModule,
  Module,
} from '@nestjs/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';

export interface SharedDatabaseConfigOption {
  entities: any[],
}
@Module({})

export class SharedDatabaseModule {
  static register(option: SharedDatabaseConfigOption): DynamicModule {
    return {
      module: SharedDatabaseModule,
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          validationOptions: {
            allowUnknown: true,
            abortEarly: true,
          },
          expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService) => ({ ...config.get('database'), ...option }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
