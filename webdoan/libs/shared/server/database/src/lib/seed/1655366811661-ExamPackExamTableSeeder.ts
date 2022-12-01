import {MigrationInterface, QueryRunner} from "typeorm";

export class ExamPackExamTableSeeder1655366811661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
           {
            "examPackId": 1,
            "examId": 1
           },
           {
            "examPackId": 1,
            "examId": 2
           },
           {
            "examPackId": 1,
            "examId": 3
           },
           {
            "examPackId": 2,
            "examId": 1
           },
           {
            "examPackId": 2,
            "examId": 2
           },
           {
            "examPackId": 2,
            "examId": 3
           },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
        .into('examPackExam')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('examPackExam')
    }

}
