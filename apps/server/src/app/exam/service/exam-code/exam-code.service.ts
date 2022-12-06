import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { ExamCode } from '../../exam-code.entity';
import { Question } from '../../question.entity';

@Injectable()
export class ExamCodeService extends BaseService<ExamCode> {
  public entity: EntityTarget<ExamCode> = ExamCode;
  public repository: Repository<ExamCode> = this.connection.getRepository(ExamCode);

  constructor(private connection: Connection) {
    super()
  }

  async createExamCode(examId: number): Promise<ExamCode> {
    const examCodeEntity = this.repository.create({ examId });
    const questions = await this.connection.getRepository(Question).createQueryBuilder('question')
      .leftJoinAndSelect('question.exams', 'exam')
      .where('exam.id = :examId', { examId })
      .getMany();
    examCodeEntity.questions = questions;
    const examCode = await this.repository.save(examCodeEntity);
    return this.repository.createQueryBuilder('examCode')
      .leftJoinAndSelect('examCode.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('examCode.id = :examCodeId', { examCodeId: examCode.id })
      .getOne()
  }

  async getExamCode(examCodeId: number): Promise<ExamCode> {
    return this.repository.createQueryBuilder('examCode')
      .leftJoinAndSelect('examCode.questions', 'question')
      .leftJoinAndSelect('question.answers', 'answer')
      .where('examCode.id = :examCodeId', { examCodeId })
      .getOne()
  }

}
