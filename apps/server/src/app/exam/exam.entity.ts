import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamPack } from '../exam-pack/exam-pack.entity';
import { ExamCode } from './exam-code.entity';
import { ExamPackExam } from './exam-pack-exam.entity';
import { ExamQuestion } from './exam-question.entity';
import { Question } from './question.entity';

@Entity({ name: 'exam' })
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column()
  categoryId: number

  @Column()
  duration: number

  @Column()
  retry: number

  @Column("decimal", { precision: 5, scale: 2 })
  referencePoint: number;

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

  @OneToMany(() => ExamQuestion, (examQuestion) => examQuestion.exam)
  examQuestions: ExamQuestion[]

  @OneToMany(() => ExamCode, (examCode) => examCode.exam)
  examCodes: ExamCode[]

  @OneToMany(() => ExamPackExam, (examPackExam) => examPackExam.exam)
  examPackExams: ExamPackExam[]

  @ManyToMany(() => ExamPack)
  @JoinTable({
    name: 'examPackExam',
  })
  examPacks: ExamPack[];

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'examQuestion',
  })
  questions: Question[]

  canRetryAnyTime(): boolean {
    return this.retry === 0;
  }
}
