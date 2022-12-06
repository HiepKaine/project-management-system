import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exam } from './exam.entity';
import { Question } from './question.entity';

@Entity({ name: 'examQuestion' })
export class ExamQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examId: number;

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

  @ManyToOne(() => Exam, (exam) => exam.examQuestions)
  exam: Exam

  @ManyToOne(() => Question, (question) => question.examQuestions)
  question: Question
}
