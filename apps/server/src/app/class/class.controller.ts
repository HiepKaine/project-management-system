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
import { Class } from './class.entity';
import { ClassService } from './class.service';
import { ClassTransformer } from './class.transformer';
import { createClassDto, updateClassDto } from './types';

@Controller('class')
export class ClassController {
  constructor(
    private classService: ClassService,
    private response: ApiResponseService
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Class>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;

    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;

    let query: SelectQueryBuilder<Class> =
      this.classService.repository.createQueryBuilder('class');

    if (param.keyword) {
      query = query.where(`class.name LIKE "%${param.keyword}%"`);
      query = query.where(`class.classCode LIKE "%${param.keyword}%"`);
    }

    const result = await this.classService.paginate(query, { page, limit });
    return this.response.paginate(result, ClassTransformer);
  }

  @Post()
  @Auth('admin')
  async create(@Body() data: createClassDto): Promise<ApiItemResponse<Class>> {
    const result = await this.classService.create(
      pick(data, ['name', 'classCode'])
    );
    return this.response.item(result, ClassTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) classId: number,
    @Body() data: updateClassDto
  ): Promise<ApiItemResponse<Class>> {
    const result = await this.classService.update(
      classId,
      pick(data, ['name', 'classCode'])
    );
    return this.response.item(result, ClassTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) classId: number
  ): Promise<ApiSuccessResponse> {
    await this.classService.destroy(classId);
    return this.response.success();
  }
}
