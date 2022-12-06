import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamCodeQuestionAnswer } from './exam-code-question-answer.entity';

import { Question } from './question.entity';

@Entity({ name: 'answer' })
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @Column()
  questionId: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question

  @OneToOne(() => ExamCodeQuestionAnswer, (examCodeQuestionAnswer) => examCodeQuestionAnswer.answer)
  examCodeQuestionAnswer: ExamCodeQuestionAnswer
}
