import {MigrationInterface, QueryRunner} from "typeorm";

export class ExamQuestionTableSeeder1655866736304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const items = [
            {
                "examId": 1,
                "questionId": 1
            },
            {
                "examId": 1,
                "questionId": 2
            },
            {
                "examId": 1,
                "questionId": 3
            },
            {
                "examId": 1,
                "questionId": 4
            },
            {
                "examId": 1,
                "questionId": 5
            },
            {
                "examId": 1,
                "questionId": 6
            },
            {
                "examId": 1,
                "questionId": 7
            },
            {
                "examId": 1,
                "questionId": 8
            },
            {
                "examId": 1,
                "questionId": 9
            },{
                "examId": 1,
                "questionId": 10
            },
            {
                "examId": 1,
                "questionId": 11
            },
            {
                "examId": 1,
                "questionId": 12
            },
            {
                "examId": 1,
                "questionId": 13
            },
            {
                "examId": 1,
                "questionId": 14
            },
            {
                "examId": 1,
                "questionId": 15
            },
            {
                "examId": 1,
                "questionId": 16
            },
            {
                "examId": 1,
                "questionId": 17
            },
            {
                "examId": 1,
                "questionId": 18
            },
            {
                "examId": 1,
                "questionId": 19
            },
            {
                "examId": 1,
                "questionId": 20
            },
            {
                "examId": 1,
                "questionId": 21
            },
            {
                "examId": 1,
                "questionId": 22
            },
            {
                "examId": 1,
                "questionId": 23
            },
            {
                "examId": 1,
                "questionId": 24
            },
            {
                "examId": 1,
                "questionId": 25
            },
            {
                "examId": 1,
                "questionId": 26
            },
            {
                "examId": 1,
                "questionId": 27
            },
            {
                "examId": 1,
                "questionId": 28
            },
            {
                "examId": 1,
                "questionId": 29
            },
            {
                "examId": 1,
                "questionId": 30
            },
            {
                "examId": 1,
                "questionId": 31
            },
            {
                "examId": 1,
                "questionId": 32
            },
            {
                "examId": 1,
                "questionId": 33
            },
            {
                "examId": 1,
                "questionId": 34
            },
            {
                "examId": 1,
                "questionId": 35
            },
            {
                "examId": 1,
                "questionId": 36
            },
            {
                "examId": 1,
                "questionId": 37
            },
            {
                "examId": 1,
                "questionId": 38
            },
            {
                "examId": 1,
                "questionId": 39
            },
            {
                "examId": 1,
                "questionId": 40
            },
            {
                "examId": 1,
                "questionId": 41
            },
            {
                "examId": 1,
                "questionId": 42
            },
            {
                "examId": 1,
                "questionId": 43
            },
            {
                "examId": 1,
                "questionId": 44
            },
            {
                "examId": 1,
                "questionId": 45
            },
            {
                "examId": 1,
                "questionId": 46
            },
            {
                "examId": 1,
                "questionId": 47
            },
            {
                "examId": 1,
                "questionId": 48
            },
            {
                "examId": 1,
                "questionId": 49
            },
            {
                "examId": 1,
                "questionId": 50
            },
            {
                "examId": 1,
                "questionId": 51
            },
            {
                "examId": 1,
                "questionId": 52
            },
            {
                "examId": 1,
                "questionId": 53
            },
            {
                "examId": 1,
                "questionId": 54
            },
            {
                "examId": 1,
                "questionId": 55
            },
            {
                "examId": 1,
                "questionId": 56
            },
            {
                "examId": 1,
                "questionId": 57
            },
            {
                "examId": 1,
                "questionId": 58
            },
            {
                "examId": 1,
                "questionId": 59
            },
            {
                "examId": 1,
                "questionId": 60
            },
        ]

        const query = queryRunner.manager.createQueryBuilder()
            .insert()
            .into('examQuestion')

        for(const item of items) {
            await query.values(item).execute()
        }
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('examQuestion')

    }

}
