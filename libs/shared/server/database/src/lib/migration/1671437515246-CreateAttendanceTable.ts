import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAttendanceTable1671437515246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendance',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'studentId',
            type: 'int',
          },
          {
            name: 'subjectId',
            type: 'int',
          },
          {
            name: 'totalAbsences',
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
        ],
      })
    );

    await queryRunner.createIndex(
        'attendance',
        new TableIndex({
          name: 'IDX_STUDENT_ID',
          columnNames: ['studentId'],
        })
      );
  
      await queryRunner.createIndex(
        'attendance',
        new TableIndex({
          name: 'IDX_SUBJECT_ID',
          columnNames: ['subjectId'],
        })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendance')
  }
}
