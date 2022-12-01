import { plainToInstance, Transform, Type } from 'class-transformer';
import { Exam } from './exam.model';
import { Question } from './question.model';

export class ExamCode {
  id!: number;
  examId!: number;
  createdAt!: Date;
  updateAt!: Date;

  @Type(() => Question)
  @Transform(({ value }) =>
    Array.isArray(value.data) && value.data.length > 0
      ? value.data.map((item: Question) => plainToInstance(Question, item))
      : []
  )
  questions!: Question[];

  @Type(() => Exam)
  @Transform(({ value }) => plainToInstance(ExamCode, value.data))
  exam!: Exam;
}

