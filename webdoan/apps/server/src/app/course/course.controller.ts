import { SelectQueryBuilder } from 'typeorm';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth
} from '@server/common';
import { pick } from 'lodash';
import { FindManyQueryParam, FindManyQueryParamWithCategory } from '../@core/types';
import { ExamPackService } from '../exam-pack/exam-pack.service';
import { ExamPackTransformer } from '../exam-pack/exam-pack.transformer';
import { Highlight } from '../highlight/highlight.entity';
import { HighlightTransformer } from '../highlight/highlight.transformer';
import { Lesson } from '../lesson/lesson.entity';
import { LessonService } from '../lesson/lesson.service';
import { LessonTransformer } from '../lesson/lesson.transformer';
import { RelatedCourse } from '../relatedCourse/relatedCourse.entity';
import { RelatedCourseService } from '../relatedCourse/relatedCourse.service';
import { RelatedCourseTransformer } from '../relatedCourse/relatedCourse.transformer';
import { AddRelatedCourseDto } from '../relatedCourse/types';
import { Review } from '../review/review.entity';
import { ReviewService } from '../review/review.service';
import { ReviewTransformer } from '../review/review.transformer';
import { HighlightService } from './../highlight/highlight.service';
import { CourseChapterLesson } from './course-chapter-lesson.entity';
import { CourseChapterLessonService } from './course-chapter-lesson.service';
import { CourseChapterLessonTransformer } from './course-chapter-lesson.transformer';
import { CourseChapter } from './course-chapter.entity';
import { CourseChapterService } from './course-chapter.service';
import { CourseChapterTransformer } from './course-chapter.transformer';

import { Course, CourseStatus } from './course.entity';
import { CourseService } from './course.service';
import { CourseTransformer } from './course.transformer';
import { AddCourseChapterDto, AddHighlightExamPackDto, AddLessonForChapterDto, CreateCourseDto, GetActiveCourseQueryParam, UpdateCourseDto } from './types';
import slugify from 'slugify';

@ApiTags('Course')
@Controller('api/course')
@ApiBearerAuth()
export class CourseController {
  constructor(
    private response: ApiResponseService,
    private courseService: CourseService,
    private relatedCourseService: RelatedCourseService,
    private courseChapterService: CourseChapterService,
    private courseChapterLessonService: CourseChapterLessonService,
    private lessonService: LessonService,
    private reviewService: ReviewService,
    private highlightService: HighlightService,
    private examPackService: ExamPackService,
  ) { }

  @Get()
  @Auth('admin')
  async index(@Query() param: FindManyQueryParamWithCategory): Promise<ApiPaginateResponse<Course>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    let query = this.getAllCourseQuery();
    if (param.categoryId) {
      query = query.andWhere('course.categoryId = :categoryId', { categoryId: param.categoryId })
    }
    if (param.keyword) {
      query = query.andWhere('course.name LIKE :keyword', { keyword: `%${param.keyword}%` })
    }
    const result = await this.courseService.paginate(query, { page, limit });
    return this.response.paginate(result, CourseTransformer)
  }

  @Get('active')
  async activeCourse(@Query() params: GetActiveCourseQueryParam): Promise<ApiPaginateResponse<Course>> {
    const page = params.page && Number(params.page) > 0 ? Math.floor(Number(params.page)) : 1;
    const limit = params.limit && Number(params.limit) > 0 ? Math.floor(Number(params.limit)) : 20;
    let query = this.getAllCourseQuery();

    query = query.andWhere('course.status = :status', { status: CourseStatus.active });

    if (params.keyword) {
      query = query.andWhere(`course.name LIKE "%${params.keyword}%"`);
    }

    if (params.type) {
      query = query.andWhere('course.type = :type', { type: params.type })
    }

    if (params.isFree) {
      query = query.andWhere('course.isFreeCourse = :isFree', { isFree: params.isFree })
    }

    const result = await this.courseService.paginate(query, { page, limit });
    return this.response.paginate(result, CourseTransformer)
  }

  private getAllCourseQuery(): SelectQueryBuilder<Course> {
    return this.courseService.repository.createQueryBuilder('course')
      .leftJoinAndSelect('course.courseChapters', 'courseChapter')
      .leftJoinAndSelect('courseChapter.lessons', 'lesson');
  }

  @Get(':courseId')
  async show(@Param('courseId', ParseIntPipe) courseId: number): Promise<ApiItemResponse<Course>> {
    const result = await this.courseService.find(courseId, { relations: ['courseChapters', 'courseChapters.lessons'] });
    return this.response.item(result, CourseTransformer)
  }

  @Post()
  @Auth('admin')
  async create(@Body() data: CreateCourseDto): Promise<ApiItemResponse<Course>> {
    let slug;
    const baseSlug = slugify(data.name, { lower: true });
    for (let i = 0; i < Infinity; i++) {
      slug = i === 0 ? baseSlug : `${baseSlug}-${i}`;
      if (!await this.courseService.isExistSlug(slug)) {
        break;
      }
    }
    const result = await this.courseService.create(
      {
        ...pick(
          data,
          ['name', 'lecturer', 'categoryId', 'image', 'video', 'description', 'isFreeCourse', 'price', 'originalPrice', 'status']
        ), ...{ slug: slug }
      });
    return this.response.item(result, CourseTransformer)
  }

  @Get(':courseId/related-course')
  async relatedCourse(@Param('courseId', ParseIntPipe) courseId: number): Promise<ApiCollectionResponse<Course>> {
    const relatedCourses = await this.relatedCourseService.repository.find({
      where: {
        courseId: courseId,
        relatedType: 'course'
      }
    })

    let result = [];

    if (relatedCourses.length) {
      result = await this.courseService.repository.createQueryBuilder('course')
        .where(`course.id IN (${relatedCourses.map(item => item.relatedId).join(',')})`)
        .getMany();
    }

    return this.response.collection(result, CourseTransformer)
  }

  @Post(':courseId/related-course')
  @Auth('admin')
  async addRelatedCourse(@Param('courseId', ParseIntPipe) courseId: number, @Body() data: AddRelatedCourseDto): Promise<ApiItemResponse<RelatedCourse>> {
    if (await this.relatedCourseService.isCourseRelateToCourse(courseId, data.relatedId)) {
      throw new ConflictException('Đã thêm bản ghi trước đó');
    }

    const result = await this.relatedCourseService.create({ courseId: courseId, relatedId: data.relatedId, relatedType: 'course' })
    return this.response.item(result, RelatedCourseTransformer)
  }

  @Get(':courseId/review')
  async getReview(@Query() param: FindManyQueryParam, @Param('courseId', ParseIntPipe) courseId: number): Promise<ApiCollectionResponse<Review>> {
    const page = param.page && Number(param.page) > 0 ? Math.floor(Number(param.page)) : 1;
    const limit = param.limit && Number(param.limit) > 0 ? Math.floor(Number(param.limit)) : 20;
    const query = this.reviewService.repository.createQueryBuilder('review')
      .andWhere("reviewableId = :reviewableId AND reviewableType = :reviewableType", { reviewableId: courseId, reviewableType: 'course' })
    const result = await this.reviewService.paginate(query, { page, limit });
    return this.response.paginate(result, ReviewTransformer)
  }

  @Get(':courseId/chapter')
  async getCourseChapter(@Param('courseId', ParseIntPipe) courseId: number): Promise<ApiCollectionResponse<CourseChapter>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    const result = await this.courseChapterService.repository.createQueryBuilder()
      .where('courseId = :courseId', { courseId: courseId })
      .getMany();

    return this.response.collection(result, CourseChapterTransformer)
  }

  @Get(':courseId/chapter/:courseChapterId')
  async showCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number): Promise<ApiItemResponse<CourseChapter>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    const result = await this.courseChapterService.find(courseChapterId)

    return this.response.collection(result, CourseChapterTransformer)
  }

  @Post(':courseId/chapter')
  async addChapter(@Param('courseId', ParseIntPipe) courseId: number, @Body() data: AddCourseChapterDto): Promise<ApiItemResponse<CourseChapter>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    const result = await this.courseChapterService.create({ courseId: courseId, name: data.name })

    return this.response.item(result, CourseChapterTransformer)
  }

  @Delete(':courseId/chapter/:courseChapterId')
  @Auth('admin')
  async deleteCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number): Promise<ApiSuccessResponse> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    await this.courseChapterService.destroy(courseChapterId)

    return this.response.success()
  }

  @Get(':courseId/chapter/:courseChapterId/lesson')
  async getLessonForCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number): Promise<ApiCollectionResponse<Lesson>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    const courseChapterLesson = await this.courseChapterLessonService.repository.createQueryBuilder()
      .where('courseChapterId = :courseChapterId', { courseChapterId })
      .getMany();

    const result = await this.lessonService.repository.createQueryBuilder('lesson')
      .where(`lesson.id IN (${courseChapterLesson.map(item => item.lessonId).join(',')})`)
      .getMany();

    return this.response.collection(result, LessonTransformer)
  }

  @Post(':courseId/chapter/:courseChapterId/lesson/complete')
  async completeLesson(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number): Promise<ApiCollectionResponse<Lesson>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    const courseChapterLesson = await this.courseChapterLessonService.repository.createQueryBuilder()
      .where('courseChapterId = :courseChapterId', { courseChapterId })
      .getMany();

    const result = await this.lessonService.repository.createQueryBuilder('lesson')
      .where(`lesson.id IN (${courseChapterLesson.map(item => item.lessonId).join(',')})`)
      .getMany();

    return this.response.collection(result, LessonTransformer)
  }

  @Get(':courseId/chapter/:courseChapterId/lesson/:lessonId')
  async showLessonForCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number, @Param('lessonId', ParseIntPipe) lessonId: number): Promise<ApiItemResponse<Lesson>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    if (! await this.courseChapterLessonService.isExist(courseChapterId, lessonId)) {
      throw new ConflictException("Không tồn tại bài học này trong chương")
    }

    const result = await this.lessonService.find(lessonId)

    return this.response.item(result, LessonTransformer)
  }

  @Post(':courseId/chapter/:courseChapterId/lesson')
  @Auth('admin')
  async addLessonForCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number, @Body() data: AddLessonForChapterDto): Promise<ApiItemResponse<CourseChapterLesson>> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    if (await this.courseChapterLessonService.isExist(courseChapterId, data.lessonId)) {
      throw new ConflictException("Đã tồn tại bài học trong chương")
    }

    const result = await this.courseChapterLessonService.create({ courseChapterId: courseChapterId, lessonId: data.lessonId })

    return this.response.item(result, CourseChapterLessonTransformer)
  }

  @Delete(':courseId/chapter/:courseChapterId/lesson/:lessonId')
  @Auth('admin')
  async deleteLessonForCourseChapter(@Param('courseId', ParseIntPipe) courseId: number, @Param('courseChapterId', ParseIntPipe) courseChapterId: number, @Param('lessonId', ParseIntPipe) lessonId: number): Promise<ApiSuccessResponse> {
    if (! await this.courseService.isExist(courseId)) {
      throw new ConflictException("Không tồn tại khóa học")
    }

    if (! await this.courseChapterService.isExist(courseId, courseChapterId)) {
      throw new ConflictException("Khóa học không tồn tại chương này.")
    }

    if (! await this.courseChapterLessonService.isExist(courseChapterId, lessonId)) {
      throw new ConflictException("Không tồn tại bài học này trong chương")
    }

    await this.courseChapterLessonService.repository.createQueryBuilder()
      .delete()
      .where("courseChapterId = :courseChapterId AND lessonId =:lessonId", { courseChapterId, lessonId })
      .execute()

    return this.response.success()
  }


  @Delete(':courseId/related-course/:relatedCourseId')
  async deleteRelatedCourse(@Param('courseId', ParseIntPipe) courseId: number, @Param('relatedCourseId') relatedId: number): Promise<ApiSuccessResponse> {
    if (!await this.relatedCourseService.isCourseRelateToCourse(courseId, relatedId)) {
      throw new ConflictException('Không tồn tại bản ghi');
    }

    await this.relatedCourseService.repository.createQueryBuilder()
      .delete()
      .where("courseId = :courseId", { courseId })
      .andWhere("relatedId = :relatedId", { relatedId })
      .andWhere("relatedType = :relatedType", { relatedType: 'course' })
      .execute()

    return this.response.success()
  }

  @Put(':courseId')
  @Auth('admin')
  async update(@Param('courseId', ParseIntPipe) courseId: number, @Body() updateCourseDto: UpdateCourseDto): Promise<ApiItemResponse<Course>> {
    const result = await this.courseService.update(courseId, updateCourseDto);
    return this.response.item(result, CourseTransformer)
  }

  @Delete(':courseId')
  @Auth('admin')
  async delete(@Param('courseId', ParseIntPipe) courseId: number): Promise<ApiSuccessResponse> {
    await this.courseService.destroy(courseId);
    return this.response.success();
  }

  @Get(':courseId/highlight')
  async getHighlight(@Param('courseId', ParseIntPipe) courseId: number): Promise<ApiCollectionResponse<Course>> {
    const items = await this.highlightService.repository.createQueryBuilder('highlight')
      .where('highlight.relatedId = :courseId', { courseId })
      .andWhere('highlight.relatedType = :relatedType', { relatedType: 'course' })
      .andWhere('highlight.resourceType = :resourceType', { resourceType: 'exam-pack' })
      .getMany();

    let result = [];
    if (Array.isArray(items) && items.length > 0) {
      result = await this.examPackService.repository.createQueryBuilder('examPack')
        .where(`examPack.id IN (${items.map(item => item.resourceId).join(',')})`)
        .leftJoinAndSelect('examPack.exams', 'exam')
        .getMany();
    }

    return this.response.collection(result, ExamPackTransformer)
  }

  @Post(':courseId/highlight')
  @Auth('admin')
  async createHighlight(@Param('courseId', ParseIntPipe) courseId: number, @Body() data: AddHighlightExamPackDto): Promise<ApiItemResponse<Highlight>> {
    if (await this.highlightService.isExistHighlightExamPack(data.examPackId, courseId)) {
      throw new ConflictException("Đã thêm bản ghi trước đó")
    }

    const item = await this.highlightService.createHighlightExamPack(data.examPackId, courseId);

    return this.response.item(item, HighlightTransformer)
  }

  @Delete(':courseId/highlight/:examPackId')
  @Auth('admin')
  async deleteHighlightExamPack(@Param('courseId', ParseIntPipe) courseId: number, @Param('examPackId', ParseIntPipe) examPackId: number): Promise<ApiSuccessResponse> {
    if (! await this.highlightService.isExistHighlightExamPack(examPackId, courseId)) {
      throw new ConflictException("Không tồn tại bản ghi")
    }

    const result = await this.highlightService.deleteHighlightExamPack(examPackId, courseId);
    if (result.affected && result.affected > 0) {
      return this.response.success()
    } else {
      throw new BadRequestException('Không có dữ liệu nào bị xoá');
    }
  }

  @Get('slug/:slug')
  @Auth('admin')
  async getslug(@Param('slug') slug: string): Promise<ApiItemResponse<Course>> {
    const result = await this.courseService.findSlug({ where: { slug } });
    return this.response.item(result, CourseTransformer)
  }

}
