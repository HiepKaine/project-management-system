import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExamTable1655275921224 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exam',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'categoryId',
            type: 'int',
            isNullable: true
          },
          {
            name: 'duration',
            type: 'int',
            default: 60
          },
          {
            name: 'retry',
            type: 'int',
            default: 0
          },
          {
            name: 'referencePoint',
            type: 'float',
            default: 5
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
    await queryRunner.dropTable('exam')
  }

}
