import { plainToInstance, Transform, Type } from 'class-transformer';
import { Ip } from './ip.model';

export class UserActivity {
  id!: number;
  userId!: number;
  ipId!: number;
  type!: string;
  agent!: string;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Ip)
  @Transform(({ value }) => (value ? plainToInstance(Ip, value) : null))
  ip!: Ip;
}
