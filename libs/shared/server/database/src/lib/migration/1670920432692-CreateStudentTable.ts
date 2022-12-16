import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateStudentTable1670920432692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'student',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'studentCode',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
          },
          {
            name: 'studentYear',
            type: 'varchar',
          },
          {
            name: 'idCard',
            type: 'varchar',
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
          },
          {
            name: 'sex',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'ethnic',
            type: 'varchar',
          },
          {
            name: 'religion',
            type: 'varchar',
          },
          {
            name: 'facultyId',
            type: 'varchar',
          },
          {
            name: 'classId',
            type: 'varchar',
          },
          {
            name: 'fatherName',
            type: 'varchar',
          },
          {
            name: 'fatherJob',
            type: 'varchar',
          },
          {
            name: 'fatherPhoneNumber',
            type: 'varchar',
          },
          {
            name: 'motherName',
            type: 'varchar',
          },
          {
            name: 'motherJob',
            type: 'varchar',
          },
          {
            name: 'motherPhoneNumber',
            type: 'varchar',
          },
          {
            name: 'note',
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

    await queryRunner.createIndex(
      'student',
      new TableIndex({
        name: 'IDX_FACULTY_ID',
        columnNames: ['facultyId'],
      })
    );

    await queryRunner.createIndex(
      'student',
      new TableIndex({
        name: 'IDX_CLASS_ID',
        columnNames: ['classId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student');
  }
}
