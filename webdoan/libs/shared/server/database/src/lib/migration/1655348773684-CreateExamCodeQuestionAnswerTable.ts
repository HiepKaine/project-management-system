import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExamCodeQuestionAnswerTable1655348773684 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'examCodeQuestionAnswer',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'examCodeQuestionId',
            type: 'int',
          },
          {
            name: 'answerId',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('examCodeQuestionAnswer')
  }

}
