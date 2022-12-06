import {
  Connection,
  EntityTarget,
  Repository,
  UpdateResult,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';

import { PasswordReset } from './entity/password-reset.entity';

@Injectable()
export class PasswordResetService extends BaseService<PasswordReset>{
  public entity: EntityTarget<PasswordReset> = PasswordReset;
  public repository: Repository<PasswordReset> = this.connection.getRepository(PasswordReset);

  constructor(private connection: Connection) {
    super();
  }

  /**
  * Expire given token
  *
  * @param email string
  */
  async expire(token: string): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ expire: () => 'NOW()' })
      .where('token = :token', { token })
      .execute();
  }

  /**
   * Expire all token of an email
   *
   * @param email string
   */
  async expireAllToken(email: string): Promise<UpdateResult> {
    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ expire: () => 'NOW()' })
      .where('user = :email', { email })
      .andWhere('type = 1')
      .andWhere('expire >= NOW()')
      .execute();
  }

  /**
   * Create new password reset token
   *
   * @param email string
   * @param token string
   */
  async generate(email: string, token: string): Promise<PasswordReset> {
    return this.create({
      user: email,
      token: token,
    });
  }

  /**
   * Dertemine
   *
   * @param entity
   */
  isExpired(entity: PasswordReset): boolean {
    const current_time = new Date();
    return current_time > new Date(entity.expire);
  }
}
