import { Exclude } from 'class-transformer';

export class RoleTransformer {
  id: number;

  name: string;

  slug: string;

  @Exclude()
  deletedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}
