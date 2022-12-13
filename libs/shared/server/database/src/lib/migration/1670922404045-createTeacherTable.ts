import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'teacherName',
            type: 'varchar',
          },
          {
            name: 'teacherPhoneNumber',
            type: 'varchar',
          },
          {
            name: 'teacherAddress',
            type: 'varchar',
          },
          {
            name: 'teacherSex',
            type: 'varchar',
          },
          {
            name: 'teacherLevel',
            type: 'varchar',
          },
          {
            name: 'teacherEmail',
            type: 'varchar',
          },
          {
            name: 'teacherNationality',
            type: 'varchar',
          },
          {
            name: 'subject',
            type: 'varchar',
          },
          {
            name: 'class',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teacher');
  }
}
