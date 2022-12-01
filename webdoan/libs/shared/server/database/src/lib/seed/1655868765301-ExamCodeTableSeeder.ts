import {MigrationInterface, QueryRunner} from "typeorm";

export class ExamCodeTableSeeder1655868765301 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "examId": 1
            }
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('examCode')

        for(const item of items) {
            await query.values(item).execute()
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('examCode')

    }
}
