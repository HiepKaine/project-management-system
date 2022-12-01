import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateExamCodeQuestionTable1655348247949 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'examCodeQuestion',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'examCodeId',
            type: 'int',
          },
          {
            name: 'questionId',
            type: 'int'
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
      'examCodeQuestion',
      new TableIndex({
        name: 'IDX_EXAMCODEQUESTION_EID',
        columnNames: ['examCodeId']
      })
    )

    await queryRunner.createIndex(
      'examCodeQuestion',
      new TableIndex({
        name: 'IDX_EXAMCODEQUESTION_QID',
        columnNames: ['questionId']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('examCodeQuestion')
  }


}
