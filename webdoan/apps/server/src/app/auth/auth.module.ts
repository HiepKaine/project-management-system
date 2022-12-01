import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedCommonModule } from '@server/common';
import { environment } from '@server/env/environment';
import { MailManagerModule } from '../mail-manager/mail-manager.module';

import { JwtStrategy } from '../strategies/jwt.strategy';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';
import { UserNotificationUnreadService } from '../systemNotification/userNotificationUnread.service';
import { UserActivityManagerModule } from '../user-activity-manager/user-activity-manager.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [
    SharedCommonModule,
    JwtModule.register({
      secret: environment.appKey,
      signOptions: {
        expiresIn: environment.jwtTtl,
      },
    }),
    MailManagerModule,
    UserActivityManagerModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    PasswordResetService,
    SystemNotificationService,
    UserNotificationUnreadService,
  ],
})
export class AuthModule { }
