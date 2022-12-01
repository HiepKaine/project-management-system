import { plainToInstance, Transform, Type } from "class-transformer";
import { UserTransformer } from "../auth/transformer/user.transformer";
import { IpTransformer } from "./ip.transformer";

export class UserActivityTransformer {
  id: number;
  userId: number;
  ipId: number;
  agent: string;
  createdAt: Date;
  updatedAt: Date;

  @Type(() => UserTransformer)
  @Transform(({ value }) => {
    if (value && value instanceof UserTransformer) {
      return value;
    } else {
      plainToInstance(UserTransformer, value);
    }
  })
  user!: UserTransformer;

  @Type(() => IpTransformer)
  @Transform(({ value }) => {
    if (value && value instanceof IpTransformer) {
      return value;
    } else {
      plainToInstance(IpTransformer, value);
    }
  })
  ip!: IpTransformer;
}
