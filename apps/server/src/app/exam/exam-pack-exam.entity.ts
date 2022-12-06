import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExamPack } from '../exam-pack/exam-pack.entity';
import { Exam } from './exam.entity';


@Entity({ name: 'examPackExam' })
export class ExamPackExam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  examId: number;

  @Column()
  examPackId: number;

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

  @ManyToOne(() => ExamPack, (examPack) => examPack.examPackExams)
  examPack: ExamPack

  @ManyToOne(() => Exam, (exam) => exam.examPackExams)
  exam: Exam
}
