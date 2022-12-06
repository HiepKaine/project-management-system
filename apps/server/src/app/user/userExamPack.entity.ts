import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/entity/user.entity";
import { ExamPack } from "../exam-pack/exam-pack.entity";

@Entity({ name: 'userExamPack'})
export class UserExamPack {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  userId: number;

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

  @ManyToOne(() => ExamPack, (examPack) => examPack.userExamPacks)
  examPack: ExamPack;

  @ManyToOne(() => User, (user) => user.userExamPacks)
  user: User;
}
