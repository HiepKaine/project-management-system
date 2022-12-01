import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { ExamCodeQuestion } from '../../exam-code-question.entity';
import { Question } from '../../question.entity';

@Injectable()
export class ExamCodeQuestionService extends BaseService<ExamCodeQuestion> {
  public entity: EntityTarget<ExamCodeQuestion> = ExamCodeQuestion;
  public repository: Repository<ExamCodeQuestion> = this.connection.getRepository(ExamCodeQuestion);

  constructor(private connection: Connection) {
    super();
  }

  async randomOrderQuestion(questions: Question[]) {
    return questions
  }
}
