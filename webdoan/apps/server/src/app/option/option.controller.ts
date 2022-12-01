import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query } from '@nestjs/common';
import { Option } from './option.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiItemResponse, ApiPaginateResponse, ApiResponseService, ApiSuccessResponse } from '@server/common';
import { OptionService } from './option.service';
import { OptionTransformer } from './option.transformer';
import { UpdateOptionDto } from './types';
import { FindManyQueryParam } from '../@core/types';

@Controller('api/option')
@ApiTags('option')
export class OptionController {
  constructor(private response: ApiResponseService, private optionService: OptionService) { }

  @Get()
  async index(@Query() param: FindManyQueryParam): Promise<ApiPaginateResponse<Option>> {
    const limit = param.limit ?? 20
    let query;
    if (param.keyword) {
      query = await this.optionService.repository.createQueryBuilder()
        .where(`label LIKE "%${param.keyword}%"`)
        .orderBy('id', 'DESC');
    } else {
      query = await this.optionService.repository.createQueryBuilder()
        .orderBy('id', 'DESC');
    }
    const result = await this.optionService.paginate(query, { limit });
    return this.response.paginate(result, OptionTransformer)
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) optionId: number): Promise<ApiItemResponse<Option>> {
    const result = await this.optionService.find(optionId);
    return this.response.item(result, OptionTransformer);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) optionId: number, @Body() data: UpdateOptionDto): Promise<ApiItemResponse<Option>> {
    const result = await this.optionService.update(optionId, { value: data.value });
    return this.response.item(result, OptionTransformer)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) optionId: number): Promise<ApiSuccessResponse> {
    await this.optionService.destroy(optionId);
    return this.response.success();
  }
}
