import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../auth/entity/user.entity";
import { Channel } from "./channel.entity";

@Entity({ name: 'userChannel'})
export class UserChannel {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  userId: number;

  @Column()
  channelId: number;

  @Column()
  unreadStatus: boolean;
  
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

  @OneToOne(() => Channel, (channel) => channel.userChannel)
  channel: Channel;

  @ManyToOne(() => User, (user) => user.userChannels)
  user: User;
}
