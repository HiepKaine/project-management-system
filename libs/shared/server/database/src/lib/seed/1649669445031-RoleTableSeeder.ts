import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class RoleTableSeeder1649669445031 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      { name: 'Super Admin', slug: 'superadmin' },
      { name: 'Admin', slug: 'admin' },
      { name: 'User', slug: 'user' },
    ];
    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('role')
    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('role');
  }

}
