import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateScoreTable1670923954301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'score',
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
            name: 'score',
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
      'score',
      new TableIndex({
        name: 'STUDENT_IDX',
        columnNames: ['studentId'],
      })
    );

    await queryRunner.createIndex(
      'score',
      new TableIndex({
        name: 'SUBJECT_IDX',
        columnNames: ['subjectId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('score');
  }
}
