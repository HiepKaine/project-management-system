import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateLessonTable1652237083662 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
              name: 'lesson',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'categoryId',
                  type: 'int',
                },
                {
                  name: 'link',
                  type: 'text',
                  isNullable: true,
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
              ],
            }),
            true,
          );

          await queryRunner.createIndex(
            'lesson',
            new TableIndex({
              name: 'IDX_CID',
              columnNames: ['categoryId'],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lesson');
    }

}
