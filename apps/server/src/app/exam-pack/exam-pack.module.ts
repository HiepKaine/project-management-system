import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { CourseService } from '../course/course.service';
import { ExamPackExamService } from '../exam/service/exam-pack-exam/exam-pack-exam.service';
import { ExamService } from '../exam/service/exam/exam.service';
import { ExamPackController } from './exam-pack.controller';
import { ExamPackService } from './exam-pack.service';
import { HighlightService } from '../highlight/highlight.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [ExamPackController],
  providers: [
    ExamPackService,
    ExamPackExamService,
    ExamService,
    CourseService,
    HighlightService,
  ],
})
export class ExamPackModule {}
