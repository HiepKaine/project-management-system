import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Score } from './score.entity';

@Injectable()
export class ScoreService extends BaseService<Score> {
  public entity: EntityTarget<Score> = Score;
  public repository: Repository<Score> = this.connection.getRepository(Score);

  constructor(private connection: Connection) {
    super();
  }
}
