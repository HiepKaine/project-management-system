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
import { Attendance } from './attendance.entity';
import { AttendanceService } from './attendance.service';
import { AttendanceTransformer } from './attendance.transformer';
import { createAttendanceDto, updateAttendanceDto } from './types';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(
    private response: ApiResponseService,
    private attendanceSerivce: AttendanceService
  ) {}

  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParam
  ): Promise<ApiPaginateResponse<Attendance>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;

    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;

    let query: SelectQueryBuilder<Attendance> =
      this.attendanceSerivce.repository.createQueryBuilder('attendance');

    if (param.keyword) {
      query = query.where(`attendance.studentId LIKE "%${param.keyword}%"`);
    }

    const result = await this.attendanceSerivce.paginate(query, {
      page,
      limit,
    });
    return this.response.paginate(result, AttendanceTransformer);
  }

  @Post()
  @Auth('admin')
  async create(
    @Body() data: createAttendanceDto
  ): Promise<ApiItemResponse<Attendance>> {
    const result = await this.attendanceSerivce.create(data);
    return this.response.item(result, AttendanceTransformer);
  }

  @Put(':id')
  @Auth('admin')
  async update(
    @Param('id', ParseIntPipe) attendanceId: number,
    @Body() data: updateAttendanceDto
  ): Promise<ApiItemResponse<Attendance>> {
    const result = await this.attendanceSerivce.update(attendanceId, data);
    return this.response.item(result, AttendanceTransformer);
  }

  @Delete()
  @Auth('admin')
  async destroy(
    @Param('id', ParseIntPipe) attendanceId: number
  ): Promise<ApiSuccessResponse> {
    await this.attendanceSerivce.destroy(attendanceId);
    return this.response.success();
  }
}
