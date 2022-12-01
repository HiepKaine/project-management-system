import {MigrationInterface, QueryRunner} from "typeorm";

export class ChannelTableSeeder1653641584038 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "name": "userAction",
                "status": 1,
            },
            {
                "name": "system",
                "status": 1,
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('channel')
      
            for (const item of items) {
                await query.values(item).execute();
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('channel')
    }

}
