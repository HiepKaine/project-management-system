import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateHighlightTable1657782178210 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'highlight',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'resourceId',
            type: 'int',
          },
          {
            name: 'resourceType',
            type: 'varchar',
          },
          {
            name: 'relatedId',
            type: 'int',
          },
          {
            name: 'relatedType',
            type: 'varchar',
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
      }),
      true,
    );

    await queryRunner.createIndex(
      'highlight',
      new TableIndex({
        name: 'IDX_HIGHLIGHT_RID',
        columnNames: ['resourceId'],
      }),
    );
    await queryRunner.createIndex(
      'highlight',
      new TableIndex({
        name: 'IDX_HIGHLIGHT_RT',
        columnNames: ['resourceType'],
      }),
    );

    await queryRunner.createIndex(
      'highlight',
      new TableIndex({
        name: 'IDX_HIGHLIGHT_RELATEDID',
        columnNames: ['relatedId'],
      }),
    );
    await queryRunner.createIndex(
      'highlight',
      new TableIndex({
        name: 'IDX_HIGHLIGHT_RELATEDT',
        columnNames: ['relatedType'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('highlight');
  }


}
