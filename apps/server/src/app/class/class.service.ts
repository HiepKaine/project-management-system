import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Class } from './class.entity';

@Injectable()
export class ClassService extends BaseService<Class> {
  public entity: EntityTarget<Class> = Class;
  repository: Repository<Class> = this.connection.getRepository(Class);
  constructor(private connection: Connection) {
    super();
  }
}
