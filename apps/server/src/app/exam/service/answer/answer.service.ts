import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Answer } from '../../answer.entity';

@Injectable()
export class AnswerService extends BaseService<Answer> { 
  public entity: EntityTarget<Answer> = Answer;
  public repository: Repository<Answer> = this.connection.getRepository(Answer);

  constructor(private connection: Connection) {
    super();
  }

}
