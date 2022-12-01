import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamCode } from './exam-code.entity';
import { ExamCodeQuestionAnswer } from './exam-code-question-answer.entity';

@Entity({ name: 'examCodeQuestion' })
export class ExamCodeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examCodeId: number;

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

  @ManyToOne(() => ExamCode, (examCode) => examCode.examCodeQuestions)
  examCode: ExamCode

  @OneToMany(() => ExamCodeQuestionAnswer, (examCodeQuestionAnswer) => examCodeQuestionAnswer.examCodeQuestion)
  examCodeQuestionAnswers: ExamCodeQuestionAnswer[]
}
