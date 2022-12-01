import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCourseTableSeeder1654246346109 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "userId": 3,
                "courseId": 1,
            }, 
            {
                "userId": 3,
                "courseId": 2,
            },
            {
                "userId": 3,
                "courseId": 3,
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('userCourse')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('userCourse')
    }

}
