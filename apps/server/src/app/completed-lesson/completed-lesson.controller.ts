import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiItemResponse,
  ApiResponseService,
  ApiSuccessResponse,
  Auth,
  AuthenticatedUser
} from '@server/common';
import { pick } from 'lodash';
import { User } from '../auth/entity/user.entity';
import { CompletedLesson } from './completed-lesson.entity';
import { CompletedLessonService } from './completed-lesson.service';
import { CompletedLessonTransformer } from './completed-lesson.transformer';
import { CreateCompletedLessonDto, UpdateCompletedLessonDto } from './types';


@ApiTags('Completed Lesson')
@Controller('completed-lesson')
export class CompletedLessonController {
  constructor(
    private response: ApiResponseService,
    private completedLessonService: CompletedLessonService,
  ) { }

  @Get('check/:courseChapterId/:lessonId')
  @Auth('user')
  async check(@AuthenticatedUser() user: User, @Param('courseChapterId', ParseIntPipe) courseChapterId: number, @Param('lessonId', ParseIntPipe) lessonId: number): Promise<ApiItemResponse<{ isCompleted: boolean }>> {
    const isCompleted = await this.completedLessonService.repository.createQueryBuilder('completedLesson')
      .where('completedLesson.courseChapterId = :courseChapterId', { courseChapterId })
      .andWhere('completedLesson.userId = :userId', { userId: user.id })
      .andWhere('completedLesson.lessonId = :lessonId', { lessonId })
      .getCount() > 0;
    return this.response.object({ isCompleted });
  }

  @Get('check-chapter-completed/:courseChapterId/')
  @Auth('user')
  async checkChapterCompletedStatus(@AuthenticatedUser() user: User, @Param('courseChapterId', ParseIntPipe) courseChapterId: number): Promise<ApiItemResponse<{ isCompleted: boolean }>> {
    const result = await this.completedLessonService.repository.createQueryBuilder('completedLesson')
      .where('completedLesson.courseChapterId = :courseChapterId', { courseChapterId })
      .andWhere('completedLesson.userId = :userId', { userId: user.id })
      .getMany();

    return this.response.collection(result, CompletedLessonTransformer);
  }

  @Get('check-course-completed/:courseId/')
  @Auth('user')
  async checkCourseCompletedStatus(@AuthenticatedUser() user: User, @Param('courseId', ParseIntPipe) courseId: number): Promise<ApiItemResponse<{ isCompleted: boolean }>> {
    const result = await this.completedLessonService.repository.createQueryBuilder('completedLesson')
      .leftJoinAndSelect('completedLesson.courseChapter', 'courseChapter')
      .where('courseChapter.courseId = :courseId', { courseId })
      .andWhere('completedLesson.userId = :userId', { userId: user.id })
      .getMany();

    return this.response.collection(result, CompletedLessonTransformer);
  }

  @Post()
  @Auth('user')
  async create(@Body() data: CreateCompletedLessonDto, @AuthenticatedUser() user: User): Promise<ApiItemResponse<CompletedLesson>> {
    const result = await this.completedLessonService.create({
      ...{ userId: user.id },
      ...pick(data, ['courseChapterId', 'lessonId'])
    });
    return this.response.item(result, CompletedLessonTransformer)
  }


  @Put(':id')
  @Auth('admin')
  async update(@Param('id', ParseIntPipe) completedLessonId: number, @AuthenticatedUser() user: User, @Body() data: UpdateCompletedLessonDto): Promise<ApiItemResponse<CompletedLesson>> {
    const result = await this.completedLessonService.update(completedLessonId, {
      ...{ userId: user.id },
      ...pick(data, ['courseChapterId', 'lessonId'])
    });
    return this.response.item(result, CompletedLessonTransformer)
  }

  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id', ParseIntPipe) completedLessonId: number): Promise<ApiSuccessResponse> {
    await this.completedLessonService.destroy(completedLessonId);
    return this.response.success();
  }
}
