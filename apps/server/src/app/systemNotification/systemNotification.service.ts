import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { ChannelId } from './channel.entity';
import { SystemNotification } from './systemNotification.entity'
import { UserNotificationUnreadService } from './userNotificationUnread.service';

@Injectable()
export class SystemNotificationService extends BaseService<SystemNotification> {
  public entity: EntityTarget<SystemNotification> = SystemNotification;
  public repository: Repository<SystemNotification> = this.connection.getRepository(SystemNotification);

  constructor(
    private connection:Connection,
    private userNotificationUnreadService: UserNotificationUnreadService
  ) {
    super()
  }

  async createSystemNotification(notificationType: number, message: string): Promise<void> {
    const sytemNotification = await this.create({
      channelId: ChannelId.userAction,
      type: notificationType,
      message: message,
    })

    await this.userNotificationUnreadService.create({
      userId: 2,
      systemNotificationId: sytemNotification.id,
    })
  }
}
