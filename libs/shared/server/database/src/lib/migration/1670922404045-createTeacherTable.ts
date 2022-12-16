import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class createTeacherTable1670922404045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teacher',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'teacherCode',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'sex',
            type: 'varchar',
          },
          {
            name: 'level',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'nationality',
            type: 'varchar',
          },
          {
            name: 'divisionId',
            type: 'int',
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
      })
    );

    await queryRunner.createIndex(
      'teacher',
      new TableIndex({
        name: 'IDX_DIVISION_ID',
        columnNames: ['divisionId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teacher');
  }
}
