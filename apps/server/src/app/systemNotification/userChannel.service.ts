import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { UserChannel } from './userChannel.entity';

@Injectable()
export class UserChannelService extends BaseService<UserChannel> {
  public entity: EntityTarget<UserChannel> = UserChannel;
  public repository: Repository<UserChannel> = this.connection.getRepository(UserChannel);

  constructor(private connection: Connection) {
    super();
  }
}
