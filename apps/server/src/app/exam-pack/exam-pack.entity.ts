import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { ExamPackExam } from '../exam/exam-pack-exam.entity';
import { Exam } from '../exam/exam.entity';
import { UserExamPack } from '../user/userExamPack.entity';

export enum ExamPackStatus {
  active = 1,
  disable = 0
}

@Entity({ name: 'examPack' })
export class ExamPack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lecturer: string;

  @Column()
  video: string;

  @Column()
  image: string;

  @Column()
  isFree: boolean;

  @Column()
  categoryId: number;

  @Column()
  price: number;

  @Column()
  originalPrice: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  slug: string;

  @Column()
  rateCount: number;

  @Column()
  rateAverage: number;

  @Column()
  status: number;

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

  @OneToMany(() => UserExamPack, (userExamPack) => userExamPack.examPack)
  userExamPacks: UserExamPack[]

  @OneToMany(() => ExamPackExam, (examPackExam) => examPackExam.examPack)
  examPackExams: ExamPackExam[]

  @ManyToMany(() => Exam)
  @JoinTable({
    name: 'examPackExam',
  })
  exams: Exam[]
}
