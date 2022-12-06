import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { TestSessionAnswer } from './test-session-answer.entity';

@Injectable()
export class TestSessionAnswerService extends BaseService<TestSessionAnswer>{
  public entity: EntityTarget<TestSessionAnswer> = TestSessionAnswer;
  public repository: Repository<TestSessionAnswer> = this.connection.getRepository(TestSessionAnswer);

  constructor(private connection: Connection) {
    super()
  }

  async isExist(testSessionId: number,questionId: number) : Promise<boolean> {  
    return await this.repository
      .createQueryBuilder()
      .where("questionId = :questionId AND testSessionId = :testSessionId", { questionId, testSessionId})
      .getCount() > 0;
  }
}
