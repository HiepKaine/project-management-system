import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateExamPackExamTable1655278820909 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'examPackExam',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'examId',
            type: 'int',
          },
          {
            name: 'examPackId',
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
        ]
      })
    )

    await queryRunner.createIndex(
      'examPackExam',
      new TableIndex({
        name: 'IDX_EXAMPACKEXAM_EID',
        columnNames: ['examId']
      })
    )

    await queryRunner.createIndex(
      'examPackExam',
      new TableIndex({
        name: 'IDX_EXAMPACKEXAM_EPID',
        columnNames: ['examPackId']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('examPackExam')
  }

}
