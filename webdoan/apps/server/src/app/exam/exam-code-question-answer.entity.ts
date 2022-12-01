import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { ExamCodeQuestion } from './exam-code-question.entity';

@Entity({ name: 'examCodeQuestionAnswer' })
export class ExamCodeQuestionAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examCodeQuestionId: number;

  @Column()
  answerId: number;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

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

  @ManyToOne(() => ExamCodeQuestion, (examCodeQuestion) => examCodeQuestion.examCodeQuestionAnswers)
  examCodeQuestion: ExamCodeQuestion

  @OneToOne(() => Answer, (answer) => answer.examCodeQuestionAnswer)
  answer: Answer
}
