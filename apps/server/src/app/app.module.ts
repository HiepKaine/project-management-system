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
import { FileModule } from './file/file.module';
import { Highlight } from './highlight/highlight.entity';
import { HighlightService } from './highlight/highlight.service';
import { Lesson } from './lesson/lesson.entity';
import { LessonModule } from './lesson/lesson.module';
import { MailManagerModule } from './mail-manager/mail-manager.module';
import { ProfileModule } from './profile/profile.module';
import { Channel } from './systemNotification/channel.entity';
import { SystemNotification } from './systemNotification/systemNotification.entity';
import { SystemNotificationModule } from './systemNotification/systemNotification.module';
import { UserChannel } from './systemNotification/userChannel.entity';
import { UserNotificationUnread } from './systemNotification/userNotificationUnread.entity';
import { UserCourse } from './user/userCourse.entity';
import { UserExamPack } from './user/userExamPack.entity';
import { Email } from './mail-manager/email.entity';
import { UserActivityManagerModule } from './user-activity-manager/user-activity-manager.module';
import { Ip } from './user-activity-manager/ip.entity';
import { UserIp } from './user-activity-manager/user-ip.entity';
import { AnalyticModule } from './analytic/analytic.module';
import { StaticServerModule } from './static-server/static-server.module';
import { FacultyModule } from './faculty/faculty.module';
import { Faculty } from './faculty/faculty.entity';
import { ClassModule } from './class/class.module';
import { Class } from './class/class.entity';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/teacher.entity';
import { SubjectModule } from './subject/subject.module';
import { Subject } from './subject/subject.entity';
import { DivisionModule } from './division/division.module';
import { Division } from './division/division.entity';
import { ScoreController } from './score/score.controller';
import { ScoreModule } from './score/score.module';
import { Score } from './score/score.entity';

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
        ExamPack,
        Lesson,
        Question,
        Answer,
        Channel,
        SystemNotification,
        UserChannel,
        UserNotificationUnread,
        UserCourse,
        UserExamPack,
        Exam,
        ExamPackExam,
        ExamQuestion,
        ExamCodeQuestion,
        ExamCodeQuestionAnswer,
        ExamCode,
        ReadingContent,
        CourseChapter,
        CourseChapterLesson,
        Highlight,
        Email,
        Ip,
        UserIp,
        UserActivity,
        Faculty,
        Class,
        Teacher,
        Subject,
        Division,
        Score,
      ],
    }),
    AuthModule,
    ProfileModule,
    CourseModule,
    FileModule,
    DictionaryModule,
    ExamPackModule,
    LessonModule,
    ExamModule,
    SystemNotificationModule,
    MailManagerModule,
    ScheduleModule.forRoot(),
    UserActivityManagerModule,
    AnalyticModule,
    StaticServerModule,
    FacultyModule,
    ClassModule,
    TeacherModule,
    SubjectModule,
    DivisionModule,
    ScoreModule,
  ],

  controllers: [AppController],
  providers: [AppService, HighlightService],
})
export class AppModule {
  constructor() {
    console.log('Static server: ', join(__dirname, 'public', 'uploads'));
  }
}
