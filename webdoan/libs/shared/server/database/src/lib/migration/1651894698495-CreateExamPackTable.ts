import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateExamPackTable1651894698495 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'examPack',
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
            name: 'lecturer',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'video',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'price',
            type: 'int',
            isNullable: true
          },
          {
            name: 'originalPrice',
            type: 'int',
            isNullable: true
          },
          {
            name: "image",
            type: "text"
          },
          {
            name: 'status',
            type: 'int',
            default: 0,
          },
          {
            name: 'isFree',
            type: 'boolean',
            default: false,
          },
          {
            name: 'categoryId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'rateCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'rateAverage',
            type: 'float',
            default: 0,
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
      'examPack',
      new TableIndex({
        name: 'IDX_EXAM_PACK_SLUG',
        columnNames: ['slug'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('examPack');
  }

}
