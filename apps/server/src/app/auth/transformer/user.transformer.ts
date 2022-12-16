import {
  Exclude,
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';

import { RoleTransformer } from './role.transformer';

export class UserTransformer {
  id: number;

  email: string;

  username: string;

  @Exclude()
  password: string;

  status: boolean;

  phoneNumber: string;

  @Exclude()
  loginFailed: number;

  createdAt: Date;

  updatedAt: Date;

  @Type(() => RoleTransformer)
  @Transform(({ value }) => value && Array.isArray(value) ? ({ data: value.map(item => plainToInstance(RoleTransformer, item)) }) : { data: [] })
  roles: { data: RoleTransformer[] };

}
