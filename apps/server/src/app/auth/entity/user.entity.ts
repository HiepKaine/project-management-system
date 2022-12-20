import { Ip } from './../../user-activity-manager/ip.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Role } from './role.entity';
import { UserChannel } from '../../systemNotification/userChannel.entity';
import { UserNotificationUnread } from '../../systemNotification/userNotificationUnread.entity';
import { UserActivity } from '../../user-activity-manager/user-activity.entity';

export enum UserStatus {
  active = 1,
  pending = 0
}

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @Column({
    type: 'varchar',
  })
  phoneNumber: string;

  @Column()
  password: string;


  @Column({
    type: 'int',
    default: 1,
  })
  status: number;

  @Column({
    type: 'int',
    default: 0,
  })
  loginFailed: number;

  @DeleteDateColumn({ type: 'timestamp' })
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

  @ManyToMany(() => Role, (role) => role.users, { cascade: ['insert'] })
  @JoinTable({
    name: 'userRole',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'roleId',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @OneToMany(() => UserChannel, (userChannel) => userChannel.user)
  userChannels: UserChannel[]

  @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
  activities: UserActivity[]

  @OneToMany(() => UserNotificationUnread, (userNotificationUnread) => userNotificationUnread.user)
  userNotificationUnreads: UserNotificationUnread[];

  @ManyToMany(() => Ip, (ip) => ip.users)
  @JoinTable({
    name: 'userIp',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ipId',
      referencedColumnName: 'id',
    },
  })
  ips: Ip[];

  getEmail(): string {
    return this.email;
  }

  isRole(role: string): boolean {
    return Array.isArray(this.roles) && this.roles.find((item) => item.slug === role) !== undefined;
  }
}
