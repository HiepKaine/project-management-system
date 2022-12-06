import { Module } from '@nestjs/common';
import { SystemNotificationController } from './systemNotification.controller';
import { ChannelService } from './channel.service';
import { SystemNotificationService } from './systemNotification.service';
import { UserChannelService } from './userChannel.service';
import { SharedCommonModule } from '@server/common';
import { UserNotificationUnreadService } from './userNotificationUnread.service';

@Module({
  imports: [SharedCommonModule],
  controllers: [SystemNotificationController],
  providers: [
    ChannelService,
    SystemNotificationService,
    UserChannelService,
    UserNotificationUnreadService,
  ],
})
export class SystemNotificationModule {}
