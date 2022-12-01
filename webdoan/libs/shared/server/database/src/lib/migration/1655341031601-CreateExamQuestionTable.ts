import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateExamQuestionTable1655341031601 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'examQuestion',
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
            name: 'questionId',
            type: 'int'
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
        ]
      })
    )

    await queryRunner.createIndex(
      'examQuestion',
      new TableIndex({
        name: 'IDX_EXAMQUESTION_EID',
        columnNames: ['examId']
      })
    )

    await queryRunner.createIndex(
      'examQuestion',
      new TableIndex({
        name: 'IDX_EXAMQUESTION_QID',
        columnNames: ['questionId']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('examQuestion')
  }

}
