import { UserActivity } from './user-activity.entity';
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
import { User } from '../auth/entity/user.entity';


@Entity({ name: 'ip' })
export class Ip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  maxAllowedUser: number;

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

  @OneToMany(() => UserActivity, (userActivity) => userActivity.ip)
  userActivities: UserActivity[]

  @ManyToMany(() => User, (user) => user.ips)
  @JoinTable({
    name: 'userIp',
    joinColumn: {
      name: 'ipId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  users: User[];

}
