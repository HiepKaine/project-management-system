import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseChapterTableSeeder1657267867807 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "courseId": 1,
                name: "Công chức kho bạc 1"
            },
            {
                "courseId": 1,
                name: "Công chức kho bạc 2"
            },
            {
                "courseId": 2,
                name: "Quản lý thị trường 1"
            },
            {
                "courseId": 2,
                name: "Quản lý thị trường 2"
            },
            {
                "courseId": 3,
                name: "Công chức thuế 1"
            },
            {
                "courseId": 3,
                name: "Công chức thuế 2"
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('courseChapter')

        for(const item of items) {
            await query.values(item).execute()
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('courseChapter')

    }
}
