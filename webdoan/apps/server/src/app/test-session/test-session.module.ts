import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { AnswerService } from '../exam/service/answer/answer.service';
import { ExamCodeService } from '../exam/service/exam-code/exam-code.service';
import { ExamPackExamService } from '../exam/service/exam-pack-exam/exam-pack-exam.service';
import { ExamService } from '../exam/service/exam/exam.service';
import { TestSessionAnswerService } from '../test-session-answer/test-session-answer.service';
import { UserRoleService } from '../user/user-role.service';
import { TestSessionController } from './test-session.controller';
import { TestSessionService } from './test-session.service';

@Module({
  imports: [
    SharedCommonModule,
  ],
  controllers: [TestSessionController],
  providers: [
    TestSessionService,
    ExamCodeService,
    TestSessionAnswerService,
    AnswerService,
    ExamService,
    UserRoleService,
    ExamPackExamService
  ],
})
export class TestSessionModule { }
