import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Exam } from '../../exam.entity';

@Injectable()
export class ExamService extends BaseService<Exam> {
  public entity: EntityTarget<Exam> = Exam;
  public repository: Repository<Exam> = this.connection.getRepository(Exam);

  constructor(private connection: Connection) {
    super()
  }

  async isExist(name: string): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("name = :name", { name })
      .getCount() > 0
  }

  async checkExistById(examId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("id = :examId", { examId })
      .getCount() > 0
  }
}
