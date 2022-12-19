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
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentTransformer } from './student.transformer';
import { createStudentDto, updateStudentDto } from './types';

@ApiTags('Student')
@Controller('student')
export class StudentController {
  constructor(
    private reponse: ApiResponseService,
    private studentService: StudentService
  ) {}

  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Student>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;

    let query: SelectQueryBuilder<Student> =
      this.studentService.repository.createQueryBuilder('student');

    if (param.keyword) {
      query = query
        .where(`student.studentCode LIKE "%${param.keyword}%`)
        .orWhere(`student.name LIKE "%${param.keyword}%`);
    }

    const result = await this.studentService.paginate(query, { page, limit });
    return this.reponse.paginate(result, StudentTransformer);
  }

  @Get(':id')
  @Auth('admin')
  async show(
    @Param('id', ParseIntPipe) studentId: number
  ): Promise<ApiItemResponse<Student>> {
    const result = await this.studentService.findOrFail(studentId);
    return this.reponse.item(result, StudentTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createStudentDto
  ): Promise<ApiItemResponse<Student>> {
    const result = await this.studentService.addStudent(data);
    return this.reponse.item(result, StudentTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() data: updateStudentDto
  ): Promise<ApiItemResponse<Student>> {
    const result = await this.studentService.updateStudent(studentId, data);
    return this.reponse.item(result, StudentTransformer);
  }

  @Delete(':id')
  @Auth('admin')
  async delete(
    @Param('id', ParseIntPipe) studentId: number
  ): Promise<ApiSuccessResponse> {
    await this.studentService.destroy(studentId);
    return this.reponse.success();
  }
}
