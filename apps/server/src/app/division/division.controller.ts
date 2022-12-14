import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
} from '@server/common';
import { pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import { FindManyQueryParam } from '../@core/types';
import { Division } from './division.entity';
import { DivisionService } from './division.service';
import { DivisionTransformer } from './division.transformer';
import { createDivisionDto, updateDivisionDto } from './types';

@ApiTags('Division')
@Controller('division')
export class DivisionController {
  constructor(
    private divisionService: DivisionService,
    private response: ApiResponseService
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Division>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;

    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;

    let query: SelectQueryBuilder<Division> =
      this.divisionService.repository.createQueryBuilder('division');

    if (param.keyword) {
      query = query.where(`division.name LIKE "%${param.keyword}%"`);
    }

    const result = await this.divisionService.paginate(query, { page, limit });
    return this.response.paginate(result, DivisionTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createDivisionDto
  ): Promise<ApiItemResponse<Division>> {
    const result = await this.divisionService.create(pick(data, ['name']));
    return this.response.item(result, DivisionTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) divisionId: number,
    @Body() data: updateDivisionDto
  ): Promise<ApiItemResponse<Division>> {
    const result = await this.divisionService.update(
      divisionId,
      pick(data, ['name'])
    );
    return this.response.item(result, DivisionTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) divisionId: number
  ): Promise<ApiSuccessResponse> {
    await this.divisionService.destroy(divisionId);
    return this.response.success();
  }
}
