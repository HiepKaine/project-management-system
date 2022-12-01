import {MigrationInterface, QueryRunner} from "typeorm";

export class RelatedCourseTableSeeder1654910829432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "courseId": 1,
                "relatedType": "course",
                "relatedId": 2,
            },
            {
                "courseId": 1,
                "relatedType": "course",
                "relatedId": 1,
            },
            {
                "courseId": 1,
                "relatedType": "exampack",
                "relatedId": 1,
            },
            {
                "courseId": 1,
                "relatedType": "exampack",
                "relatedId": 2,
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('relatedCourse')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('relatedCourse')
    }

}
