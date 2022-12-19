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
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';
import { SubjectTransformer } from './subject.transformer';
import { createSubjectDto, updateSubjectDto } from './types';

@ApiTags('Subject')
@Controller('subject')
export class SubjectController {
  constructor(
    private response: ApiResponseService,
    private subjectService: SubjectService
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Subject>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    let query: SelectQueryBuilder<Subject> =
      this.subjectService.repository.createQueryBuilder('subject');

    if (param.keyword) {
      query = query
        .where(`subject.name LIKE "%${param.keyword}%"`)
        .orWhere(`subject.subjectCode LIKE "%${param.keyword}%"`);
    }

    const result = await this.subjectService.paginate(query, { page, limit });
    return this.response.paginate(result, SubjectTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createSubjectDto
  ): Promise<ApiItemResponse<Subject>> {
    const result = await this.subjectService.create(
      pick(data, ['name', 'subjectCode'])
    );

    return this.response.item(result, SubjectTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) subjectId: number,
    @Body() data: updateSubjectDto
  ): Promise<ApiItemResponse<Subject>> {
    const result = await this.subjectService.update(
      subjectId,
      pick(data, ['name', 'subjectCode'])
    );

    return this.response.item(result, SubjectTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) subjectId: number
  ): Promise<ApiSuccessResponse> {
    await this.subjectService.destroy(subjectId);
    return this.response.success();
  }
}
