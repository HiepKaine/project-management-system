import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateRelatedExamPackTable1654909996709 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'relatedExamPack',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'examPackId',
            type: 'int'
          },
          {
            name: 'relatedType',
            type: 'varchar'
          },
          {
            name: 'relatedId',
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
      'relatedExamPack',
      new TableIndex({
        name: 'examPackId',
        columnNames: ['examPackId'],
      })
    );

    await queryRunner.createIndex(
      'relatedExamPack',
      new TableIndex({
        name: 'relatedExamPackId',
        columnNames: ['relatedId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('relatedExamPack')
  }

}
