import {
  Connection,
  EntityTarget,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';

import { Contact } from './contact.entity';

@Injectable()
export class ContactService extends BaseService<Contact>{
  public entity: EntityTarget<Contact> = Contact;
  public repository: Repository<Contact> = this.connection.getRepository(Contact);

  constructor(private connection: Connection) {
    super();
  }

}
