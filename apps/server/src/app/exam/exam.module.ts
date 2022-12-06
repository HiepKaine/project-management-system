import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';

import { ExamController } from './exam.controller';
import { QuestionService } from './service/question/question.service';
import { AnswerService } from './service/answer/answer.service';
import { ExamService } from './service/exam/exam.service';
import { ExamPackExamService } from './service/exam-pack-exam/exam-pack-exam.service';
import { ExamCodeService } from './service/exam-code/exam-code.service';
import { ExamCodeQuestionService } from './service/exam-code-question/exam-code-question.service';
import { ExamCodeQuestionAnswerService } from './service/exam-code-question-answer/exam-code-question-answer.service';
import { ExamQuestionService } from './service/exam-question/exam-question.service';
import { ReadingContentService } from './service/reading-content/reading-content.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [ExamController],
  providers: [
    QuestionService,
    AnswerService,
    ExamService,
    ExamPackExamService,
    ExamCodeService,
    ExamCodeQuestionService,
    ExamCodeQuestionAnswerService,
    ExamQuestionService,
    ReadingContentService,
  ],
})
export class ExamModule {}
