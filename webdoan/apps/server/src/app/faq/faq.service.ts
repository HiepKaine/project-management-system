import {
  Connection,
  EntityTarget,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Faq } from './faq.entity';


@Injectable()
export class FaqService extends BaseService<Faq>{
  public entity: EntityTarget<Faq> = Faq;
  public repository: Repository<Faq> = this.connection.getRepository(Faq);

  constructor(private connection: Connection) {
    super();
  }

}
