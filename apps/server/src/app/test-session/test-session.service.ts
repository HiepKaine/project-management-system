import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { TestSession } from './test-session.entity';

@Injectable()
export class TestSessionService extends BaseService<TestSession> {
  public entity: EntityTarget<TestSession> = TestSession;
  public repository: Repository<TestSession> = this.connection.getRepository(TestSession);
  
  constructor(private connection: Connection) {
    super();
  }

  async isExist(userId: number, testSessionId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("userId = :userId AND id = :testSessionId", { userId, testSessionId })
      .getCount() > 0;
  }
}
