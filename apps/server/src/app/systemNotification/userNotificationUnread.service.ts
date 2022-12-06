import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { UserNotificationUnread } from './userNotificationUnread.entity';

@Injectable()
export class UserNotificationUnreadService extends BaseService<UserNotificationUnread>{
  public entity: EntityTarget<UserNotificationUnread> = UserNotificationUnread;
  public repository: Repository<UserNotificationUnread> = this.connection.getRepository(UserNotificationUnread);

  constructor(private connection: Connection) {
    super()
  }
}
