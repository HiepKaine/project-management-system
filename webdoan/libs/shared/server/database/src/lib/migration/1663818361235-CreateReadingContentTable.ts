import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateReadingContentTable1663818361235 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'readingContent',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'content',
            type: 'text'
          },
          {
            name: 'categoryId',
            type: 'int',
            isNullable: true
          },
          {
            name: 'type',
            type: 'int',
            comment: '1: điền từ, 2: bài đọc'
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
      'readingContent',
      new TableIndex({
        name: 'IDX_RCONTENT_CATEGORY_ID',
        columnNames: ['categoryId']
      })
    )

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('readingContent')
  }

}