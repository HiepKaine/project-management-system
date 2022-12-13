import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
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
import { Faculty } from './faculty.entity';
import { FacultyService } from './faculty.service';
import { FacultyTransformer } from './faculty.transformer';
import { createFacultyDto, updateFacultyDto } from './types';

@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(
    private response: ApiResponseService,
    private facultyService: FacultyService
  ) {}

  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Faculty>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;

    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;

    let query: SelectQueryBuilder<Faculty> =
      this.facultyService.repository.createQueryBuilder('faculty');

    if (param.keyword) {
      query = query
        .where(`faculty.name LIKE "%${param.keyword}%"`)
        .orWhere(`faculty.facultyCode LIKE "%${param.keyword}%"`)
    }

    const result = await this.facultyService.paginate(query, { page, limit });
    return this.response.paginate(result, FacultyTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createFacultyDto
  ): Promise<ApiItemResponse<Faculty>> {
    const result = await this.facultyService.create(
      pick(data, ['name', 'facultyCode'])
    );
    return this.response.item(result, FacultyTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) facultyId: number,
    @Body() data: updateFacultyDto
  ): Promise<ApiItemResponse<Faculty>> {
    const result = await this.facultyService.update(
      facultyId,
      pick(data, ['name', 'facultyCode'])
    );
    return this.response.item(result, FacultyTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) facultyId: number
  ): Promise<ApiSuccessResponse> {
    await this.facultyService.destroy(facultyId);
    return this.response.success();
  }
}
