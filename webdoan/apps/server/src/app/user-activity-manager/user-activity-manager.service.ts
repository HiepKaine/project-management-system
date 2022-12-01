import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { environment } from '@server/env/environment';
import { Connection, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { Ip } from './ip.entity';
import { UserActivity, UserActivityType } from './user-activity.entity';
import { UserIp } from './user-ip.entity';

@Injectable()
export class UserActivityManagerService extends BaseService<UserActivity> {
  public entity: EntityTarget<UserActivity> = UserActivity;
  public repository: Repository<UserActivity> = this.connection.getRepository(UserActivity);
  constructor(
    private connection: Connection
  ) {
    super();
  }

  async listUserIp(userId: number): Promise<Ip[]> {
    return this.connection.getRepository(Ip).createQueryBuilder('ip')
      .leftJoin('ip.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany()
  }

  async removeUserIp(userId: number, ipId: number): Promise<DeleteResult> {
    return this.connection.getRepository(UserIp).createQueryBuilder('userIp')
      .delete()
      .where('userIp.userId = :userId', { userId })
      .where('userIp.ipId = :ipId', { ipId })
      .execute()
  }

  async saveUserIp(userId: number, ip: string): Promise<Ip> {
    let ipEntity = await this.connection.getRepository(Ip).findOne({ where: { ip } });
    if (!ipEntity) {
      ipEntity = await this.connection.getRepository(Ip).save({ ip });
    }
    const isExistUserIp = await this.connection.getRepository(UserIp).count({ where: { ipId: ipEntity.id, userId } }) > 0;
    if (!isExistUserIp) {
      await this.connection.getRepository(UserIp).save({ ipId: ipEntity.id, userId });
    }
    return ipEntity;
  }




  async checkValidActivityAndSaveIp(userId: number, ip: string, headers): Promise<boolean> {
    const ipEntity = await this.saveUserIp(userId, ip);
    console.log(ipEntity);

    console.log({
      userId,
      ipId: Number(ipEntity.id),
      type: UserActivityType.login,
      agent: headers['user-agent']
    });
    await this.create({
      userId,
      ipId: Number(ipEntity.id),
      type: UserActivityType.login,
      agent: headers['user-agent']
    });

    return;
  }
}
