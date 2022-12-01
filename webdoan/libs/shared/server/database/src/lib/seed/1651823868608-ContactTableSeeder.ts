import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class ContactTableSeeder1651823868608 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const items = [
      {
        "name": "Nguyễn Hoàng Minh Anh",
        "email": "nguyenhoangminhanh112233@vicoders.com",
        "phone": "0123456789",
        "content": '',
        "status": 1,
        "type": 1
      },
    ];

    const query = queryRunner.manager.createQueryBuilder()
      .insert()
      .into('contact')


    for (const item of items) {
      await query.values(item).execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('contact');
  }

}
