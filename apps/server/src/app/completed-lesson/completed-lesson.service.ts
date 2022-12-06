import {
  Connection,
  EntityTarget,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { CompletedLesson } from './completed-lesson.entity';


@Injectable()
export class CompletedLessonService extends BaseService<CompletedLesson>{
  public entity: EntityTarget<CompletedLesson> = CompletedLesson;
  public repository: Repository<CompletedLesson> = this.connection.getRepository(CompletedLesson);

  constructor(private connection: Connection) {
    super();
  }

}
