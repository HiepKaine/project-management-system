import {
  Connection,
  EntityTarget,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import {
  BaseService,
  HashService,
} from '@server/common';
import { random, padStart } from 'lodash';
import { Role } from './entity/role.entity';
import { User } from './entity/user.entity';

@Injectable()
export class AuthService extends BaseService<User> {
  public entity: EntityTarget<User> = User;
  public repository: Repository<User> = this.connection.getRepository(User);

  constructor(private connection: Connection, private hashService: HashService) {
    super();
  }

  async findUser(options: FindOneOptions): Promise<User | undefined> {
    return this.repository.findOne(options);
  }

  async increaseLoginFailed(userId: number): Promise<UpdateResult> {
    return this.repository
      .createQueryBuilder()
      .update()
      .set({
        loginFailed: () => "loginFailed + 1",
      })
      .where("id = :id", { id: userId })
      .execute()
  }

  async resetLoginFailed(userId: number): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({
        loginFailed: 0,
      })
      .where("id = :id", { id: userId })
      .execute()
  }

  async isExist(email: string): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("email = :email", { email })
      .getCount() > 0;
  }

  async attachDefaultRole(user: number | User): Promise<User> {
    if (!(user instanceof User)) {
      user = await this.find(user);
    }
    const defaultRole = await this.connection.getRepository(Role).createQueryBuilder()
      .where('slug = :slug', { slug: 'user' })
      .getOne();
    user.roles = [defaultRole];
    return this.repository.save(user);
  }

  async changePassword(userId: number, password: string): Promise<UpdateResult> {
    return await this.repository.createQueryBuilder()
      .update()
      .set({ password: this.hashService.hash(password) })
      .where('id = :id', { id: userId })
      .execute();
  }

  async generateNewUserCode(): Promise<string> {
    const code = padStart(random(1000000).toString(), 6, '0');
    const isExist = await this.count({ where: { code } }) > 0;
    if (!isExist) {
      return code;
    } else {
      return this.generateNewUserCode();
    }
  }
}
