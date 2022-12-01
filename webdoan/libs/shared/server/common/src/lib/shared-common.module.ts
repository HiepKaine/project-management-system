import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiResponseService } from './http/api-response.service';
import { HashService } from './services/hash.service';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    ApiResponseService,
    HashService
  ],
  exports: [
    ApiResponseService,
    HashService,
  ],
})
export class SharedCommonModule { }
