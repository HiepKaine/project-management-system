import { plainToInstance, Transform, Type } from "class-transformer";
import { UserTransformer } from "../auth/transformer/user.transformer";

export class IpTransformer {
  id: number;
  ip: number;
  maxAllowedUser: number | null;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => UserTransformer)
  @Transform(({ value }) => {
    if (Array.isArray(value) && value.length > 0 && value[0] instanceof UserTransformer) {
      return value;
    } else {
      return Array.isArray(value) ? value.map(item => plainToInstance(UserTransformer, item)) : []
    }
  })
  users!: UserTransformer[];
}
