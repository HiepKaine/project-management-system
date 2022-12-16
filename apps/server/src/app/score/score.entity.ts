import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'score' })
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  subjectId: number;

  @Column()
  studentId: number;

  @DeleteDateColumn({
    type: 'timestamp',
  })
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
}
