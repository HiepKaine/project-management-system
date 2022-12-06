import moment = require("moment");
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "../auth/entity/user.entity";
import { ExamCode } from "../exam/exam-code.entity";
import { TestSessionAnswer } from "../test-session-answer/test-session-answer.entity";

export enum TestSessionStatus {
  process = 0,
  complete = 1
}

@Entity({ name: 'testSession' })
export class TestSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  examPackId: number;

  @Column()
  examId: number;

  @Column()
  examCodeId: number;

  @Column()
  score: number;

  @Column()
  correctQuestion: number;

  @Column()
  inCorrectQuestion: number;

  @Column()
  skipQuestion: number;


  @Column()
  status: number;

  @Column({
    type: 'timestamp',
  })
  startTime: Date;

  @Column({
    type: 'timestamp',
  })
  completedAt: Date;

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

  @OneToMany(() => TestSessionAnswer, (testSessionAnswer) => testSessionAnswer.testSession)
  testSessionAnswers: TestSessionAnswer[]

  @ManyToOne(() => User, (user) => user.testSessions)
  user: User

  @ManyToOne(() => ExamCode, (examCode) => examCode.testSessions)
  examCode: ExamCode

  isFinished(duration: number): boolean {
    const start = moment(this.startTime);
    const end = start.add(duration, 'minute');
    const now = moment();
    return now.diff(end) > 0;
  }
}
