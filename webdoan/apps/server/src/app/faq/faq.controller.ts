import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth
} from '@server/common';
import { pick } from 'lodash';
import { FindManyQueryParam } from '../@core/types';
import { Faq } from './faq.entity';
import { FaqService } from './faq.service';
import { FaqTransformer } from './faq.transformer';
import { CreateFaqDto, UpdateFaqDto } from './types';


@ApiTags('FAQ')
@Controller('api/faq')
export class FaqController {
  constructor(
    private response: ApiResponseService,
    private faqService: FaqService,
  ) { }

  @Get()
  async index(@Query() params: FindManyQueryParam): Promise<ApiPaginateResponse<Faq>> {
    let query;
    if (params.keyword) {
      query = await this.faqService.repository.createQueryBuilder()
        .where(`question LIKE "%${params.keyword}%"`)
        .orderBy('id', 'DESC');
    } else {
      query = await this.faqService.repository.createQueryBuilder()
        .orderBy('id', 'DESC');
    }
    const result = await this.faqService.paginate(query, { page: params.page ?? 1, limit: params.limit ?? 20 });
    return this.response.paginate(result, FaqTransformer)
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) faqId: number): Promise<ApiItemResponse<Faq>> {
    const result = await this.faqService.find(faqId);
    return this.response.item(result, FaqTransformer)
  }

  @Post()
  @Auth('admin')
  async create(@Body() data: CreateFaqDto): Promise<ApiItemResponse<Faq>> {
    const result = await this.faqService.create(pick(data, ['question', 'answer']));
    return this.response.item(result, FaqTransformer)
  }


  @Put(':id')
  @Auth('admin')
  async update(@Param('id', ParseIntPipe) faqId: number, @Body() data: UpdateFaqDto): Promise<ApiItemResponse<Faq>> {
    const result = await this.faqService.update(faqId, pick(data, ['question', 'answer']));
    return this.response.item(result, FaqTransformer)
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) faqId: number): Promise<ApiSuccessResponse> {
    await this.faqService.destroy(faqId);
    return this.response.success();
  }
}
