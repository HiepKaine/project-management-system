import {MigrationInterface, QueryRunner} from "typeorm";

export class UserChannelTableSeeder1653701285054 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "userId": 2,
                "channelId": 1,
            }, 
            {
                "userId": 2,
                "channelId": 2,
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('userChannel')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('userChannel')
    }

}
