import { UserActivity } from './user-activity-manager/user-activity.entity';
import { join } from 'path';

import { Module } from '@nestjs/common';
import { SharedDatabaseModule } from '@server/database';

import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PasswordReset } from './auth/entity/password-reset.entity';
import { Permission } from './auth/entity/permission.entity';
import { RolePermission } from './auth/entity/role-permission.entity';
import { Role } from './auth/entity/role.entity';
import { UserRole } from './auth/entity/user-role.entity';
import { User } from './auth/entity/user.entity';
import { Category } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { Contact } from './contact/contact.entity';
import { ContactModule } from './contact/contact.module';
import { CourseChapterLesson } from './course/course-chapter-lesson.entity';
import { CourseChapter } from './course/course-chapter.entity';
import { Course } from './course/course.entity';
import { CourseModule } from './course/course.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { ExamPack } from './exam-pack/exam-pack.entity';
import { ExamPackModule } from './exam-pack/exam-pack.module';
import { Answer } from './exam/answer.entity';
import { ExamCodeQuestionAnswer } from './exam/exam-code-question-answer.entity';
import { ExamCodeQuestion } from './exam/exam-code-question.entity';
import { ExamCode } from './exam/exam-code.entity';
import { ExamPackExam } from './exam/exam-pack-exam.entity';
import { ExamQuestion } from './exam/exam-question.entity';
import { Exam } from './exam/exam.entity';
import { ExamModule } from './exam/exam.module';
import { Question } from './exam/question.entity';
import { ReadingContent } from './exam/reading-content.entity';
import { Faq } from './faq/faq.entity';
import { FaqModule } from './faq/faq.module';
import { FileModule } from './file/file.module';
import { Highlight } from './highlight/highlight.entity';
import { HighlightService } from './highlight/highlight.service';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { MailManagerModule } from './mail-manager/mail-manager.module';
import { Option } from './option/option.entity';
import { OptionModule } from './option/option.module';
import { ProfileModule } from './profile/profile.module';
import { RelatedCourse } from './relatedCourse/relatedCourse.entity';
import { RelatedExamPack } from './relatedExamPack/relatedExamPack.entity';
import { Review } from './review/review.entity';
import { ReviewModule } from './review/review.module';
import { Slider } from './slider/slider.entity';
import { SliderModule } from './slider/slider.module';
import { Channel } from './systemNotification/channel.entity';
import { SystemNotification } from './systemNotification/systemNotification.entity';
import { SystemNotificationModule } from './systemNotification/systemNotification.module';
import { UserChannel } from './systemNotification/userChannel.entity';
import { UserNotificationUnread } from './systemNotification/userNotificationUnread.entity';
import { TestSessionAnswer } from './test-session-answer/test-session-answer.entity';
import { TestSessionAnswerService } from './test-session-answer/test-session-answer.service';
import { TestSession } from './test-session/test-session.entity';
import { TestSessionModule } from './test-session/test-session.module';
import { UserModule } from './user/user.module';
import { UserCourse } from './user/userCourse.entity';
import { UserExamPack } from './user/userExamPack.entity';
import { Email } from './mail-manager/email.entity';
import { UserActivityManagerModule } from './user-activity-manager/user-activity-manager.module';
import { Ip } from './user-activity-manager/ip.entity';
import { UserIp } from './user-activity-manager/user-ip.entity';
import { AnalyticModule } from './analytic/analytic.module';
import { StaticServerModule } from './static-server/static-server.module';
import { CompletedLesson } from './completed-lesson/completed-lesson.entity';
import { CompletedLessonModule } from './completed-lesson/completed-lesson.module';

@Module({
  imports: [
    SharedDatabaseModule.register({
      entities: [
        User,
        Role,
        Permission,
        UserRole,
        RolePermission,
        PasswordReset,
        Course,
        Category,
        Contact,
        ExamPack,
        Lesson,
        Question,
        Answer,
        Slider,
        Option,
        Channel,
        SystemNotification,
        UserChannel,
        UserNotificationUnread,
        UserCourse,
        UserExamPack,
        RelatedCourse,
        RelatedExamPack,
        Exam,
        ExamPackExam,
        ExamQuestion,
        ExamCodeQuestion,
        ExamCodeQuestionAnswer,
        ExamCode,
        ReadingContent,
        TestSession,
        TestSessionAnswer,
        CourseChapter,
        CourseChapterLesson,
        Review,
        Highlight,
        Faq,
        Email,
        Ip,
        UserIp,
        UserActivity,
        CompletedLesson
      ],
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    CourseModule,
    FileModule,
    CategoryModule,
    DictionaryModule,
    ContactModule,
    ExamPackModule,
    LessonModule,
    ExamModule,
    SliderModule,
    OptionModule,
    SystemNotificationModule,
    TestSessionModule,
    ReviewModule,
    FaqModule,
    MailManagerModule,
    ScheduleModule.forRoot(),
    UserActivityManagerModule,
    AnalyticModule,
    CompletedLessonModule,
    StaticServerModule,
  ],

  controllers: [AppController],
  providers: [AppService, TestSessionAnswerService, HighlightService],
})
export class AppModule {
  constructor() {
    console.log('Static server: ', join(__dirname, 'public', 'uploads'));
  }
}
