import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { ExamCodeQuestion } from './exam-code-question.entity';
import { Question } from './question.entity';
import { TestSession } from '../test-session/test-session.entity';


@Entity({ name: 'examCode' })
export class ExamCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examId: number;

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

  @ManyToOne(() => Exam, (exam) => exam.examCodes)
  exam: Exam

  @OneToMany(() => ExamCodeQuestion, (examCodeQuestion) => examCodeQuestion.examCode)
  examCodeQuestions: ExamCodeQuestion[]

  @ManyToMany(() => Question, (question) => question.examCodes, { cascade: ['insert'] })
  @JoinTable({
    name: 'examCodeQuestion',
    joinColumn: {
      name: 'examCodeId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'questionId',
      referencedColumnName: 'id',
    },
  })
  questions: Question[];

  @OneToMany(() => TestSession, (testSession) => testSession.examCode)
  testSessions: TestSession[]
}

