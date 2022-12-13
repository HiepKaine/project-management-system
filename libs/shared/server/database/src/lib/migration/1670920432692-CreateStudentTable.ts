import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'studentName',
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
            name: 'studentIdCard',
            type: 'varchar',
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
          },
          {
            name: 'studentSex',
            type: 'varchar',
          },
          {
            name: 'studentDate',
            type: 'varchar',
          },
          {
            name: 'studentAddress',
            type: 'varchar',
          },
          {
            name: 'studentEthnic',
            type: 'varchar',
          },
          {
            name: 'studentReligion',
            type: 'varchar',
          },
          {
            name: 'studentFacutly',
            type: 'varchar',
          },
          {
            name: 'studentClass',
            type: 'varchar',
          },
          {
            name: 'fatherStudent',
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
            name: 'motherStudent',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student');
  }
}
