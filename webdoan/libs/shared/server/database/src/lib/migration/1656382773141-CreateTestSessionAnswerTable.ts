import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateTestSessionAnswerTable1656382773141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'testSessionAnswer',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'testSessionId',
                        type: 'int'
                    },
                    {
                        name: 'questionId',
                        type: 'int'
                    },
                    {
                        name: 'answerId',
                        type: 'int'
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'NOW()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'NOW()',
                    },
                ]
            })
        )

        await queryRunner.createIndex(
            'testSessionAnswer',
            new TableIndex({
              name: 'IDX_TESTSESSIONANSWER_TID',
              columnNames: ['testSessionId']
            })
          )
      
        await queryRunner.createIndex(
            'testSessionAnswer',
            new TableIndex({
                name: 'IDX_TESTSESSIONANSWER_QID',
                columnNames: ['questionId']
            })
        )

        await queryRunner.createIndex(
            'testSessionAnswer',
            new TableIndex({
                name: 'IDX_TESTSESSIONANSWER_AID',
                columnNames: ['answerId']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.clearTable('testSessionAnswer')
    }

}
