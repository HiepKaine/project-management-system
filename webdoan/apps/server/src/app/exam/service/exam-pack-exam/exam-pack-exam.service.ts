
import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { ExamPackExam } from '../../exam-pack-exam.entity';

@Injectable()
export class ExamPackExamService extends BaseService<ExamPackExam>{
  public entity: EntityTarget<ExamPackExam> = ExamPackExam;
  public repository: Repository<ExamPackExam> = this.connection.getRepository(ExamPackExam);

  constructor(private connection: Connection){
    super();
  }

  async isExist(examId: number, examPackId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("examId = :examId AND examPackId = :examPackId", { examId, examPackId })
      .getCount() > 0
  }
}
