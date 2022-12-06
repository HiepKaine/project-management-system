import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService, SharedCommonModule } from '@server/common';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';
import { AuthService } from '../auth/auth.service';
import { UserNotificationUnreadService } from '../systemNotification/userNotificationUnread.service';
import { UserCourseService } from './userCourse.service';
import { UserExamPackService } from './userExamPack.service';
import { CourseService } from '../course/course.service';
import { ExamPackService } from '../exam-pack/exam-pack.service';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [SharedCommonModule],
  providers: [
    UserService,
    SystemNotificationService,
    AuthService,
    HashService,
    UserNotificationUnreadService,
    UserCourseService,
    UserExamPackService,
    CourseService,
    ExamPackService,
    UserRoleService,
  ],
  controllers: [UserController],
})
export class UserModule {}
