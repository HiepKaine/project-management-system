import {MigrationInterface, QueryRunner} from "typeorm";

export class CourseChapterLessonTableSeeder1657268390854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "courseChapterId": 1,
                "lessonId": 1
            },
            {
                "courseChapterId": 1,
                "lessonId": 2
            },
            {
                "courseChapterId": 2,
                "lessonId": 1
            },
            {
                "courseChapterId": 2,
                "lessonId": 2
            },
            {
                "courseChapterId": 3,
                "lessonId": 1
            },
            {
                "courseChapterId": 3,
                "lessonId": 2
            },
            {
                "courseChapterId": 4,
                "lessonId": 1
            },
            {
                "courseChapterId": 4,
                "lessonId": 2
            },
            {
                "courseChapterId": 5,
                "lessonId": 1
            },
            {
                "courseChapterId": 5,
                "lessonId": 2
            },
            {
                "courseChapterId": 6,
                "lessonId": 1
            },
            {
                "courseChapterId": 6,
                "lessonId": 2
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('courseChapterLesson')

        for(const item of items) {
            await query.values(item).execute()
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('courseChapterLesson')

    }

}
