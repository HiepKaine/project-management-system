import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseChapterService } from './course-chapter.service';
import { CourseChapterLessonService } from './course-chapter-lesson.service';
import { LessonService } from '../lesson/lesson.service';
import { ExamPackService } from '../exam-pack/exam-pack.service';
import { HighlightService } from '../highlight/highlight.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseChapterService,
    CourseChapterLessonService,
    LessonService,
    ExamPackService,
    HighlightService
  ],
})
export class CourseModule { }
