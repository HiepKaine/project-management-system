import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Answer } from './answer.entity';
import { Exam } from './exam.entity';
import { ExamCode } from './exam-code.entity';
import { ExamQuestion } from './exam-question.entity';
import { ReadingContent } from './reading-content.entity';

@Entity({ name: 'question' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  categoryId: number;

  @Column()
  note: string;

  @Column()
  readingContentId: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public createdAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  public deletedAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: null,
    default: () => 'NOW()',
  })
  public updatedAt: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]

  @OneToMany(() => ExamQuestion, (examQuestion) => examQuestion.question)
  examQuestions: ExamQuestion[]


  @ManyToMany(() => Exam, (exam) => exam.questions, { cascade: ['insert'] })
  @JoinTable({
    name: 'examQuestion',
    joinColumn: {
      name: 'questionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'examId',
      referencedColumnName: 'id',
    },
  })
  exams: Exam[];

  @ManyToMany(() => ExamCode, (examCode) => examCode.questions, { cascade: ['insert'] })
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
  examCodes: ExamCode[];

  @ManyToOne(() => ReadingContent, (readingContent) => readingContent.questions)
  readingContent: ReadingContent;

}
