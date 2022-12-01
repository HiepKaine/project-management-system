import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserCourseTable1654245797664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: "userCourse",
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
                        name: 'courseId',
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
            'userCourse',
            new TableIndex({
              name: 'IDX_USERCOURSE_UID',
              columnNames: ['userId'],
            }),
          );

        await queryRunner.createIndex(
            'userCourse',
            new TableIndex({
              name: 'IDX_USERCOURSE_CID',
              columnNames: ['courseId'],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userCourse')
    }

}
