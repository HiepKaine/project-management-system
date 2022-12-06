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
import { pick } from 'lodash';
import {
  FindManyQueryParam,
  FindManyQueryParamWithCategory,
} from '../@core/types';
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
import {
  AddCourseChapterDto,
  AddHighlightExamPackDto,
  AddLessonForChapterDto,
  CreateCourseDto,
  GetActiveCourseQueryParam,
  UpdateCourseDto,
} from './types';
import slugify from 'slugify';

@ApiTags('Course')
@Controller('course')
@ApiBearerAuth()
export class CourseController {}
