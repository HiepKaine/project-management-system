import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { UserExamPack } from './userExamPack.entity';

@Injectable()
export class UserExamPackService extends BaseService<UserExamPack> {
  public entity: EntityTarget<UserExamPack> = UserExamPack;
  public repository: Repository<UserExamPack> = this.connection.getRepository(UserExamPack);

  constructor(private connection: Connection) {
    super();
  }
 
  async isExist(userId : number, examPackId : number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("userId = :userId AND examPackId = :examPackId", { userId, examPackId})
      .getCount() > 0
  }
}
