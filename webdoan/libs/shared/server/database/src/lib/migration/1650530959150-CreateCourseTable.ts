import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class CreateCourseTable1650530959150 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'course',
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
          },
          {
            name: 'categoryId',
            type: 'int',
            isNullable: true
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'video',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true
          },
          {
            name: 'isFreeCourse',
            type: 'boolean',
            default: 0
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
            name: 'rateCount',
            type: 'int',
            default: 0,
          },
          {
            name: 'rateAverage',
            type: 'float',
            default: 0,
          },
          {
            name: 'status',
            type: 'int',
            default: 0
          },
          {
            name: 'type',
            type: 'int',
            default: 1
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'deletedAt',
            isNullable: true,
            type: 'datetime',
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
      'course',
      new TableIndex({
        name: 'IDX_COURSE_SLUG',
        columnNames: ['slug'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('course');
  }

}
