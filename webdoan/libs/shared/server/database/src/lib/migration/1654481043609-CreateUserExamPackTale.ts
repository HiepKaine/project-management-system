import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserExamPackTale1654481043609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: "userExamPack",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'userId',
                        type: 'int',
                    },
                    {
                        name: 'examPackId',
                        type: 'int',
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
            'userExamPack',
            new TableIndex({
              name: 'IDX_UserExamPack_UID',
              columnNames: ['userId'],
            }),
          );

        await queryRunner.createIndex(
            'userExamPack',
            new TableIndex({
              name: 'IDX_UserExamPack_EID',
              columnNames: ['examPackId'],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userExamPack')
    }

}
