import { Module } from '@nestjs/common';
import { SharedCommonModule } from '@server/common';
import { MailManagerModule } from '../mail-manager/mail-manager.module';
import { SystemNotificationService } from '../systemNotification/systemNotification.service';
import { UserNotificationUnreadService } from '../systemNotification/userNotificationUnread.service';

import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
    SharedCommonModule,
    MailManagerModule
  ],
  controllers: [ContactController],
  providers: [
    ContactService,
    UserNotificationUnreadService,
    SystemNotificationService,
  ],
})
export class ContactModule { }
