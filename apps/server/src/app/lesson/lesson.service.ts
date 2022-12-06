import {
  Connection,
  EntityTarget,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';

import { Lesson } from './lesson.entity';

@Injectable()
export class LessonService extends BaseService<Lesson>{
  public entity: EntityTarget<Lesson> = Lesson;
  public repository: Repository<Lesson> = this.connection.getRepository(Lesson);

  constructor(private connection: Connection) {
    super();
  }

}
