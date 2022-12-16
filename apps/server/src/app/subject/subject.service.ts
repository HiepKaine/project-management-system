import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  public entity: EntityTarget<Subject> = Subject;
  repository: Repository<Subject> = this.connection.getRepository(Subject);
  constructor(private connection: Connection) {
    super();
  }
}
