import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/entity/user.entity";
import { SystemNotification } from "./systemNotification.entity";

@Entity({ name: 'userNotificationUnread'})
export class UserNotificationUnread {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  userId: number;

  @Column()
  systemNotificationId: number;

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

  @OneToOne(() => SystemNotification, (systemNotification) => systemNotification.userNotificationUnread)
  systemNotification: SystemNotification

  @ManyToOne(() => User, (user) => user.userNotificationUnreads)
  user: User;
}
