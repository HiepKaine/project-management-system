import {MigrationInterface, QueryRunner} from "typeorm";

export class UserNotificationUnreadTableSeeder1654079237155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "userId": 2,
                "systemNotificationId": 1,
            }, 
            {
                "userId": 2,
                "systemNotificationId": 2,
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('userNotificationUnread')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.clear('userNotificationUnread')
    }

}
