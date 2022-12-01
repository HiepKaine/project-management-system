import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TestSession } from "../test-session/test-session.entity";

@Entity({ name: 'testSessionAnswer'})
export class TestSessionAnswer {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  @Index()
  testSessionId: number;

  @Column()
  @Index()
  questionId: number;

  @Column()
  @Index()
  answerId: number;

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

  @ManyToOne(() => TestSession, (testSession) => testSession.testSessionAnswers)
  testSession: TestSession


}
