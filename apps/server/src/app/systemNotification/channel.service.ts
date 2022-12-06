import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Channel } from './channel.entity'

@Injectable()
export class ChannelService extends BaseService<Channel>  {
  public entity: EntityTarget<Channel> = Channel;
  public repository: Repository<Channel> = this.connection.getRepository(Channel);

  constructor(private connection: Connection) {
    super();
  }
}
