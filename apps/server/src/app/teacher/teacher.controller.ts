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
import { SelectQueryBuilder } from 'typeorm';
import { FindManyQueryParam } from '../@core/types';
import { Teacher } from './teacher.entity';
import { TeacherService } from './teacher.service';
import { TeacherTransformer } from './teacher.transformer';
import { createTeacherDto, updateTeacherDto } from './types';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(
    private response: ApiResponseService,
    private teacherService: TeacherService
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Teacher>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    let query: SelectQueryBuilder<Teacher> =
      this.teacherService.repository.createQueryBuilder('teacher');

    if (param.keyword) {
      query = query.where(`teacher.name LIKE "%${param.keyword}%"`);
    }

    const result = await this.teacherService.paginate(query, { page, limit });
    return this.response.paginate(result, TeacherTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createTeacherDto
  ): Promise<ApiItemResponse<Teacher>> {
    const result = await this.teacherService.createTeacher(data);

    return this.response.item(result, TeacherTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) teacherId: number,
    @Body() data: updateTeacherDto
  ): Promise<ApiItemResponse<Teacher>> {
    const result = await this.teacherService.updateTeacher(teacherId, data);

    return this.response.item(result, TeacherTransformer);
  }

  @Delete(':id')    
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) teacherId: number
  ): Promise<ApiSuccessResponse> {
    await this.teacherService.destroy(teacherId);
    return this.response.success();
  }
}
