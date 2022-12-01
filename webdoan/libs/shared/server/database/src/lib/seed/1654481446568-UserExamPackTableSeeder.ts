import {MigrationInterface, QueryRunner} from "typeorm";

export class UserExamPackTableSeeder1654481446568 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "userId": 3,
                "examPackId": 1,
            },
            {
                "userId": 3,
                "examPackId": 2,
            },
            {
                "userId": 3,
                "examPackId": 3,
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('userExamPack')
        
        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('userExamPack')
    }
}