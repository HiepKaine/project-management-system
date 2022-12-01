import { FindManyQueryParamWithCategory } from './../@core/types';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
} from '@server/common';

import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { LessonTransformer } from './lesson.transformer';
import { CreateLessonDto, UpdateLessonDto } from './types';

@ApiTags('lesson')
@Controller('api/lesson')
@ApiBearerAuth()
export class LessonController {
  constructor(private response: ApiResponseService, private lessonService: LessonService) { }
  @Get()
  @Auth('admin')
  async index(@Query() param: FindManyQueryParamWithCategory): Promise<ApiPaginateResponse<Lesson>> {
    let query;
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    if (param.keyword) {
      query = await this.lessonService.repository.createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.category', 'category')
        .where(`lesson.name LIKE "%${param.keyword}%"`)
        .orderBy('lesson.id', 'DESC');
    } else {
      query = await this.lessonService.repository.createQueryBuilder('lesson')
        .leftJoinAndSelect('lesson.category', 'category')
        .orderBy('lesson.id', 'DESC');
    }
    if (param.categoryId) {
      query = query.andWhere('lesson.categoryId = :categoryId', { categoryId: param.categoryId })
    }
    const result = await this.lessonService.paginate(query, { page, limit });
    return this.response.paginate(result, LessonTransformer)
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) lessonId: number): Promise<ApiItemResponse<Lesson>> {
    const result = await this.lessonService.find(lessonId);
    return this.response.item(result, LessonTransformer)
  }

  @Post()
  async create(@Body() data: CreateLessonDto): Promise<ApiItemResponse<Lesson>> {
    const result = await this.lessonService.create(data);
    return this.response.item(result, LessonTransformer)
  }

  @Put(':id')
  @Auth('admin')
  async update(@Param('id', ParseIntPipe) lessonId: number, @Body() data: UpdateLessonDto): Promise<ApiItemResponse<Lesson>> {
    const result = await this.lessonService.update(lessonId, data);
    return this.response.item(result, LessonTransformer)
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) lessonId: number): Promise<ApiSuccessResponse> {
    await this.lessonService.destroy(lessonId);
    return this.response.success();
  }
}
