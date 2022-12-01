import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiResponseService,
} from '@server/common';

import { DictionaryService } from './dictionary.service';
import { DictionaryTransformer } from './dictionary.transformer';
import { Dictionary } from './types';

@ApiTags('Dictionary')
@Controller('api/dictionary')
export class DictionaryController {
  constructor(private response: ApiResponseService, private dictionaryService: DictionaryService) { }
  @Get()
  async index(): Promise<ApiItemResponse<Dictionary>> {
    const data = await this.dictionaryService.getData();
    return this.response.item(data, DictionaryTransformer);
  }
}
