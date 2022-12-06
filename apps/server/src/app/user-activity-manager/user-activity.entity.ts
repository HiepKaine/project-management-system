import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../auth/entity/user.entity';
import { Ip } from './ip.entity';


export enum UserActivityType {
  login = 'login'
}

@Entity({ name: 'userActivity' })
export class UserActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  ipId: number;

  @Column()
  type: string;

  @Column()
  agent: string;

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

  @ManyToOne(() => Ip, (ip) => ip.userActivities)
  ip: Ip;

  @ManyToOne(() => User, (user) => user.activities)
  user: User;


}
