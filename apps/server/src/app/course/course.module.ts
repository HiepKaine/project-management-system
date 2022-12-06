import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { RelatedCourseService } from '../relatedCourse/relatedCourse.service';

import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseChapterService } from './course-chapter.service';
import { CourseChapterLessonService } from './course-chapter-lesson.service';
import { LessonService } from '../lesson/lesson.service';
import { ReviewService } from '../review/review.service';
import { ExamPackService } from '../exam-pack/exam-pack.service';
import { HighlightService } from '../highlight/highlight.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    RelatedCourseService,
    CourseChapterService,
    CourseChapterLessonService,
    LessonService,
    ReviewService,
    ExamPackService,
    HighlightService
  ],
})
export class CourseModule { }
