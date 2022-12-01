import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';

import { Option } from './option.entity';

@Injectable()
export class OptionService extends BaseService<Option> {
  public entity: EntityTarget<Option> = Option;
  public repository: Repository<Option> = this.connection.getRepository(Option);

  constructor(private connection: Connection) {
    super();
  }
}


