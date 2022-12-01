import {MigrationInterface, QueryRunner} from "typeorm";

export class ExamTableSeeder1655276901858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "name": "Đề 001: Hiến pháp 2013"
            },
            {
                "name": "Đề 002: Hiến pháp 2013"
            },
            {
                "name": "Đề 003: Hiến pháp 2013"
            },
            {
                "name": "Đề 004: Hiến pháp 2013"
            },
            {
                "name": "Đề 005: Hiến pháp 2013"
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('exam')

        for(const item of items) {
            await query.values(item).execute()
        }
    }

    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('exam')

    }

}
