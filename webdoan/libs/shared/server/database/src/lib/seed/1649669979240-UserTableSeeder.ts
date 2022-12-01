import { environment } from './../../../../common/src/environments/environment';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

const enum UserStatus {
  active = 1
}

export class UserTableSeeder1649669979240 implements MigrationInterface {
  private saltRounds = 10;
  private hash(data: string): string {
    return bcrypt.hashSync(data, bcrypt.genSaltSync(this.saltRounds));
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        email: 'superadmin@vicoders.com',
        username: 'superadmin',
        password: this.hash('secret'),
        role: 'superadmin',
        phoneNumber: '0123456789',
        status: UserStatus.active,
        loginFailed: 0,
      },
      {
        email: 'admin@vicoders.com',
        username: 'admin',
        password: this.hash('secret'),
        role: 'admin',
        phoneNumber: '0123456788',
        status: UserStatus.active,
        loginFailed: 0,
      },
      {
        email: 'user@vicoders.com',
        username: 'user',
        password: this.hash('secret'),
        role: 'user',
        phoneNumber: '0123456787',
        image: `${environment.appUrl}/uploads/hoangthuong.png`,
        status: UserStatus.active,
        loginFailed: 0,
      },
      {
        email: 'hoangthuong@gmail.com',
        username: 'hoangthuong',
        password: this.hash('secret'),
        role: 'user',
        image: `${environment.appUrl}/uploads/hoangthuong.png`,
        status: UserStatus.active,
        loginFailed: 0,
      }
    ];
    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('user')

    const roles = await queryRunner.query('SELECT * from role');

    for (const item of items) {
      const u = await query.values(_.pick(item, ['username', 'email', 'password', 'status', 'image', 'phoneNumber'])).execute();
      const role = roles.find((r) => r.slug === item.role);
      if (role) {
        await queryRunner.manager.createQueryBuilder()
          .insert()
          .into('userRole')
          .values({ userId: u.raw.insertId, roleId: role.id })
          .execute();
      }
    }

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('user');
  }

}
