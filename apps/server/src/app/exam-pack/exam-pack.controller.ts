import {
  Body,
  ConflictException,
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
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
} from '@server/common';
import slugify from 'slugify';
import { SelectQueryBuilder } from 'typeorm';
import { Course } from '../course/course.entity';
import { CourseService } from '../course/course.service';
import { CourseTransformer } from '../course/course.transformer';
import { Exam } from '../exam/exam.entity';
import { ExamPackExamService } from '../exam/service/exam-pack-exam/exam-pack-exam.service';
import { ExamService } from '../exam/service/exam/exam.service';
import { Highlight } from '../highlight/highlight.entity';
import { HighlightService } from '../highlight/highlight.service';
import { HighlightTransformer } from '../highlight/highlight.transformer';
import {
  FindManyQueryParamWithCategory,
} from './../@core/types';
import { ExamPack, ExamPackStatus } from './exam-pack.entity';
import { ExamPackService } from './exam-pack.service';
import { ExamPackTransformer } from './exam-pack.transformer';
import {
  AddExamDto,
  AddHighlightDto,
  CreateExamPackDto,
  GetActiveExamPackQueryParam,
  UpdateExamPackDto,
} from './types';

@ApiTags('exam-pack')
@Controller('exam-pack')
@ApiBearerAuth()
export class ExamPackController {
  constructor(
    private response: ApiResponseService,
    private examPackService: ExamPackService,
    private examPackExamService: ExamPackExamService,
    private examService: ExamService,
    private courseService: CourseService,
    private highlightService: HighlightService,
  ) {}
  @Get()
  @Auth('admin')
  async index(
    @Query() param: FindManyQueryParamWithCategory
  ): Promise<ApiPaginateResponse<ExamPackService>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    let query: SelectQueryBuilder<ExamPack> = this.examPackService.repository
      .createQueryBuilder('examPack')
      .leftJoinAndSelect('examPack.exams', 'exam')
      .orderBy('examPack.id', 'DESC');

    if (param.keyword) {
      query = query.andWhere(`examPack.name LIKE "%${param.keyword}%"`);
    }
    if (param.categoryId) {
      query = query.andWhere('examPack.categoryId = :categoryId', {
        categoryId: param.categoryId,
      });
    }
    const result = await this.examPackService.paginate(query, { page, limit });
    return this.response.paginate(result, ExamPackTransformer);
  }

  @Get('active')
  async activeExamPack(
    @Query() params: GetActiveExamPackQueryParam
  ): Promise<ApiPaginateResponse<ExamPackService>> {
    const page =
      params.page && Number(params.page) > 0
        ? Math.floor(Number(params.page))
        : 1;
    const limit =
      params.limit && Number(params.limit) > 0
        ? Math.floor(Number(params.limit))
        : 20;
    let query: SelectQueryBuilder<ExamPack> = this.examPackService.repository
      .createQueryBuilder('examPack')
      .leftJoinAndSelect('examPack.exams', 'exam')
      .where('examPack.status = :status', { status: ExamPackStatus.active })
      .orderBy('examPack.id', 'DESC');

    if (params.keyword) {
      query = query.andWhere(`examPack.name LIKE "%${params.keyword}%"`);
    }
    if (params.isFree) {
      query = query.andWhere('examPack.isFree = :isFree', {
        isFree: params.isFree,
      });
    }

    const result = await this.examPackService.paginate(query, { page, limit });
    return this.response.paginate(result, ExamPackTransformer);
  }

  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiItemResponse<ExamPack>> {
    const result = await this.examPackService.repository
      .createQueryBuilder('examPack')
      .leftJoinAndSelect('examPack.exams', 'exam')
      .where('examPack.id = :examPackId', { examPackId: id })
      .getOneOrFail();
    return this.response.item(result, ExamPackTransformer);
  }

  @Post()
  async create(
    @Body() data: CreateExamPackDto
  ): Promise<ApiItemResponse<ExamPack>> {
    let slug;
    const baseSlug = slugify(data.name, { lower: true });
    for (let i = 0; i < Infinity; i++) {
      slug = i === 0 ? baseSlug : `${baseSlug}-${i}`;
      if (!(await this.examPackService.isExistSlug(slug))) {
        break;
      }
    }
    const result = await this.examPackService.create({ ...data, slug: slug });
    return this.response.item(result, ExamPackTransformer);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) examPackId: number,
    @Body() data: UpdateExamPackDto
  ): Promise<ApiItemResponse<ExamPack>> {
    const result = await this.examPackService.update(examPackId, data);
    return this.response.item(result, ExamPackTransformer);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) examPackId: number
  ): Promise<ApiSuccessResponse> {
    await this.examPackService.destroy(examPackId);
    return this.response.success();
  }


  @Get(':id/exam')
  async getExamOfExamPack(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiCollectionResponse<Exam>> {
    const examPackExams = await this.examPackExamService.repository.find({
      where: {
        examPackId: id,
      },
    });

    let result = [];

    if (examPackExams.length) {
      result = await this.examService.repository
        .createQueryBuilder('exam')
        .where(
          `exam.id IN (${examPackExams.map((item) => item.examId).join(',')})`
        )
        .getMany();
    }

    return this.response.collection(result, ExamPackTransformer);
  }

  @Get(':examPackId/highlight')
  async getHighlight(
    @Param('examPackId', ParseIntPipe) examPackId: number
  ): Promise<ApiCollectionResponse<Course>> {
    const items = await this.highlightService.repository
      .createQueryBuilder('highlight')
      .where('highlight.relatedId = :examPackId', { examPackId })
      .andWhere('highlight.relatedType = :relatedType', {
        relatedType: 'exam-pack',
      })
      .andWhere('highlight.resourceType = :resourceType', {
        resourceType: 'course',
      })
      .getMany();

    let result = [];
    if (Array.isArray(items) && items.length > 0) {
      result = await this.courseService.repository
        .createQueryBuilder('course')
        .leftJoinAndSelect('course.courseChapters', 'courseChapter')
        .leftJoinAndSelect('courseChapter.lessons', 'lesson')
        .where(
          `course.id IN (${items.map((item) => item.resourceId).join(',')})`
        )
        .getMany();
    }

    return this.response.collection(result, CourseTransformer);
  }

  @Post(':examPackId/highlight')
  @Auth('admin')
  async createHighlight(
    @Param('examPackId', ParseIntPipe) examPackId: number,
    @Body() data: AddHighlightDto
  ): Promise<ApiItemResponse<Highlight>> {
    if (
      await this.highlightService.isExistHighlightCourse(
        data.courseId,
        examPackId
      )
    ) {
      throw new ConflictException('Đã thêm bản ghi trước đó');
    }

    const item = await this.highlightService.createHighlightCourse(
      data.courseId,
      examPackId
    );

    return this.response.item(item, HighlightTransformer);
  }

  @Delete(':examPackId/highlight/:courseId')
  @Auth('admin')
  async deleteHighlightExamPack(
    @Param('examPackId', ParseIntPipe) examPackId: number,
    @Param('courseId', ParseIntPipe) courseId: number
  ): Promise<ApiSuccessResponse> {
    if (
      !(await this.highlightService.isExistHighlightCourse(
        courseId,
        examPackId
      ))
    ) {
      throw new ConflictException('Không tồn tại bản ghi');
    }

    const result = await this.highlightService.deleteHighlightCourse(
      courseId,
      examPackId
    );
    console.log(result);
    return this.response.success();
  }

  @Post(':examPackId/exam')
  @Auth('admin')
  async addExamForExamPack(
    @Param('examPackId', ParseIntPipe) examPackId: number,
    @Body() data: AddExamDto
  ): Promise<ApiSuccessResponse> {
    if (await this.examPackExamService.isExist(data.examId, examPackId)) {
      throw new ConflictException('Đề thi đã được thêm vào gói trước đó');
    }

    await this.examPackExamService.create({
      examId: data.examId,
      examPackId: examPackId,
    });

    return this.response.success();
  }

  @Delete(':examPackId/exam/:examId')
  @Auth('admin')
  async deleteExamOfExamPack(
    @Param('examPackId', ParseIntPipe) examPackId: number,
    @Param('examId', ParseIntPipe) examId: number
  ): Promise<ApiSuccessResponse> {
    if (!(await this.examPackExamService.isExist(examId, examPackId))) {
      throw new ConflictException('Đề thi không thuộc gói này');
    }

    await this.examPackExamService.repository
      .createQueryBuilder()
      .delete()
      .where('examId = :examId AND examPackId = :examPackId', {
        examId,
        examPackId,
      })
      .execute();

    return this.response.success();
  }

  @Get('slug/:slug')
  @Auth('admin')
  async getslug(
    @Param('slug') slug: string
  ): Promise<ApiItemResponse<ExamPack>> {
    const result = await this.examPackService.findSlug({ where: { slug } });
    return this.response.item(result, ExamPackTransformer);
  }
}
