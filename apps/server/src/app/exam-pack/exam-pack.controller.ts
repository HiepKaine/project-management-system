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
  AuthenticatedUser,
} from '@server/common';
import slugify from 'slugify';
import { SelectQueryBuilder } from 'typeorm';
import { User } from '../auth/entity/user.entity';
import { Course } from '../course/course.entity';
import { CourseService } from '../course/course.service';
import { CourseTransformer } from '../course/course.transformer';
import { Exam } from '../exam/exam.entity';
import { ExamPackExamService } from '../exam/service/exam-pack-exam/exam-pack-exam.service';
import { ExamService } from '../exam/service/exam/exam.service';
import { Highlight } from '../highlight/highlight.entity';
import { HighlightService } from '../highlight/highlight.service';
import { HighlightTransformer } from '../highlight/highlight.transformer';
import { RelatedExamPack } from '../relatedExamPack/relatedExamPack.entity';
import { RelatedExamPackService } from '../relatedExamPack/relatedExamPack.service';
import { RelatedExamPackTransformer } from '../relatedExamPack/relatedExamPack.transformer';
import { AddRelatedExamPackToExamPackDto } from '../relatedExamPack/types';
import { Review } from '../review/review.entity';
import { ReviewService } from '../review/review.service';
import { ReviewTransformer } from '../review/review.transformer';
import {
  FindManyQueryParam,
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
    private reviewService: ReviewService,
    private courseService: CourseService,
    private highlightService: HighlightService,
    private relatedExamPackService: RelatedExamPackService
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

  @Get(':id/related')
  async getRelatedCourse(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ApiCollectionResponse<ExamPack>> {
    const relatedExamPacks = await this.relatedExamPackService.repository.find({
      where: {
        relatedId: id,
        relatedType: 'exam-pack',
      },
    });

    let result = [];

    if (relatedExamPacks.length) {
      result = await this.examPackService.repository
        .createQueryBuilder('examPack')
        .leftJoinAndSelect('examPack.exams', 'exam')
        .where(
          `examPack.id IN (${relatedExamPacks
            .map((item) => item.examPackId)
            .join(',')})`
        )
        .getMany();
    }

    return this.response.collection(result, CourseTransformer);
  }

  @Post(':id/related')
  async addRelatedCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: AddRelatedExamPackToExamPackDto
  ): Promise<ApiItemResponse<RelatedExamPack>> {
    if (
      await this.relatedExamPackService.isExamPackRelateToExamPack(
        data.examPackId,
        id
      )
    ) {
      throw new ConflictException('Đã thêm bản ghi trước đó');
    }

    const result = await this.relatedExamPackService.create({
      examPackId: data.examPackId,
      relatedId: id,
      relatedType: 'exam-pack',
    });
    return this.response.item(result, RelatedExamPackTransformer);
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

  @Get(':examPackId/review')
  async getReview(
    @Query() param: FindManyQueryParam,
    @Param('examPackId', ParseIntPipe) examPackId: number
  ): Promise<ApiCollectionResponse<Review>> {
    const page =
      param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit =
      param.limit && Number(param.limit) > 0
        ? Math.floor(Number(param.limit))
        : 20;
    const query = this.reviewService.repository
      .createQueryBuilder('review')
      .andWhere(
        'reviewableId = :reviewableId AND reviewableType = :reviewableType',
        { reviewableId: examPackId, reviewableType: 'exampack' }
      );
    const result = await this.reviewService.paginate(query, { page, limit });
    return this.response.paginate(result, ReviewTransformer);
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

  @Delete(':examPackId/related/:relatedExamPackId')
  async deleteRelatedCourse(
    @Param('examPackId', ParseIntPipe) examPackId: number,
    @Param('relatedExamPackId') relatedExamPackId: number
  ): Promise<ApiSuccessResponse> {
    if (
      !(await this.relatedExamPackService.isExamPackRelateToExamPack(
        examPackId,
        relatedExamPackId
      ))
    ) {
      throw new ConflictException('Không tồn tại bản ghi');
    }

    await this.relatedExamPackService.repository
      .createQueryBuilder()
      .delete()
      .where('examPackId = :relatedExamPackId', { relatedExamPackId })
      .andWhere('relatedId = :relatedId ', { relatedId: examPackId })
      .andWhere('relatedId = :relatedId AND relatedType = :relatedType', {
        relatedType: 'exam-pack',
      })
      .execute();

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

  @Get(':examPackId/remaining-exam-time')
  @Auth('admin', 'user')
  async getRemainingExamTime(
    @AuthenticatedUser() user: User,
    @Param('examPackId', ParseIntPipe) examPackId: number
  ): Promise<ApiSuccessResponse> {
    const examPack = await this.examPackService.findOrFail(examPackId, {
      relations: ['exams'],
    });
    const { exams } = examPack;
    const result: Array<{
      examId: number;
      remaining: number | null;
      retry: number;
    }> = [];
    for (const exam of exams) {
      if (exam.canRetryAnyTime()) {
        result.push({ examId: exam.id, remaining: null, retry: exam.retry });
      } else {
        const completedExamCount = await this.examService.completedExamCount(
          user.id,
          examPackId,
          exam.id
        );
        const remaining = exam.retry - completedExamCount;
        result.push({
          examId: exam.id,
          remaining: remaining > 0 ? remaining : 0,
          retry: exam.retry,
        });
      }
    }
    return this.response.object(result);
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
