import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { ExamQuestion } from '../../exam-question.entity';

@Injectable()
export class ExamQuestionService extends BaseService<ExamQuestion> {
  public entity: EntityTarget<ExamQuestion> = ExamQuestion;
  public repository: Repository<ExamQuestion> = this.connection.getRepository(ExamQuestion);

  constructor(private connection: Connection) {
    super();
  }

  async isExamQuestionExist(examId: number, questionId: number): Promise<boolean> {
    return await this.connection.getRepository(ExamQuestion).createQueryBuilder('examQuestion')
      .where("examQuestion.examId = :examId", { examId })
      .andWhere("examQuestion.questionId = :questionId", { questionId })
      .getCount() > 0;
  }

  async addExamQuestion(examId: number, questionId: number): Promise<DeleteResult> {
    return this.connection.getRepository(ExamQuestion).createQueryBuilder('examQuestion')
      .insert()
      .values({
        examId,
        questionId
      })
      .execute()
  }

  async removeExamQuestion(examId: number, questionId: number): Promise<DeleteResult> {
    return this.connection.getRepository(ExamQuestion).createQueryBuilder('examQuestion')
      .delete()
      .where("examQuestion.examId = :examId", { examId })
      .andWhere("examQuestion.questionId = :questionId", { questionId })
      .execute()
  }
}
