import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateRelatedCourseTable1654909996708 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'relatedCourse',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'courseId',
                        type: 'int'
                    },
                    {
                        name: 'relatedType',
                        type: 'varchar'
                    },
                    {
                        name: 'relatedId',
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
            'relatedCourse',
            new TableIndex({
                name: 'courseId',
                columnNames: ['courseId'],
            })
        );

        await queryRunner.createIndex(
            'relatedCourse',
            new TableIndex({
                name: 'relatedCourseId',
                columnNames: ['relatedId'],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('relatedCourse')
    }

}
