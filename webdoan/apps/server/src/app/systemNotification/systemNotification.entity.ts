import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Channel } from './channel.entity'
import { UserNotificationUnread } from "./userNotificationUnread.entity";

export enum NotificationType {
  UserRegister =  1,
  UserByItem =  2,
  UserContact = 3
}

@Entity({ name: 'systemNotification'})
export class SystemNotification {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  channelId: number;

  @Column()
  type: number;

  @Column()
  action: string;

  @Column()
  message: string;

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

  @ManyToOne(() => Channel, (channel) => channel.systemNotifications)
  channel: Channel

  @OneToOne(() => UserNotificationUnread, (userNotificationUnread) => userNotificationUnread.systemNotification)
  userNotificationUnread: UserNotificationUnread;
}
