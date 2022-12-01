import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SystemNotification  } from "./systemNotification.entity";
import { UserChannel } from "./userChannel.entity";

export enum ChannelId {
  userAction = 1,
  system = 2,
}

@Entity({ name: 'channel'})
export class Channel {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

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

  @OneToMany(() => SystemNotification, (systemNotification) => systemNotification.channel)
  systemNotifications: SystemNotification[]

  @OneToOne(() => UserChannel, (userChannel) => userChannel.channel)
  userChannel: UserChannel
}
