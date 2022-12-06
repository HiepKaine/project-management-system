import {
  plainToInstance,
  Transform,
  Type,
} from 'class-transformer';

import { Role } from './role.model';

export class User {
  id!: number;
  email!: string | null;
  code!: string | null;
  fullname!: string | null;
  firstName!: string | null;
  lastName!: string | null;
  status!: number;
  username!: string;
  password!: string;
  phoneNumber!: string;
  position!: string;
  organization!: string;
  image!: string;
  verifiedAt!: string;
  deletedAt!: string;
  createdAt!: string;
  updatedAt!: string;


  @Type(() => Role)
  @Transform(({ value }) => Array.isArray(value.data) && value.data.length > 0 ? value.data.map((item: Role) => plainToInstance(Role, item)) : [])
  roles!: Role[];


  isAdmin(): boolean {
    if (
      this.roles[0]?.slug === 'admin' ||
      this.roles[0]?.slug === 'superadmin'
    ) {
      return true;
    } else {
      return false;
    }
  }

  isUser(): boolean {
    if (this.roles[0]?.slug === 'user') {
      return true;
    } else {
      return false;
    }
  }


  getFullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.lastName} ${this.firstName}`;
    } else {
      return this.email ?? '';
    }
  }

}
