import {MigrationInterface, QueryRunner} from "typeorm";

export class SystemNotificationTableSeeder1653641999794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "channelId": 1,
                "message": "Học viên đăng ký ",
                "type": 1,
            },
            {
                "channelId": 1,
                "message": "Học viên mua khóa học",
                "type": 2,
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('systemNotification')
      
            for (const item of items) {
                await query.values(item).execute();
        }


        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('systemNotification')
    }

}
