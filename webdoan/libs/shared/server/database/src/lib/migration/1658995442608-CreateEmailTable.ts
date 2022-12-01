import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateEmailTable1658995442608 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'email',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'to',
            type: 'varchar',
            default: '""'
          },
          {
            name: 'subject',
            type: 'varchar',
            default: '""'
          },
          {
            name: 'title',
            type: 'varchar',
            default: '""'
          },
          {
            name: 'greeting',
            type: 'varchar',
            default: '""'
          },
          {
            name: 'content',
            type: 'text',
            isNullable: true
          },
          {
            name: 'error',
            type: 'text',
            isNullable: true
          },
          {
            name: 'sent',
            type: 'smallint',
            default: 0
          },
          {
            name: 'retry',
            type: 'smallint',
            default: 0
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
      'email',
      new TableIndex({
        name: 'IDX_EMAIL_SENT',
        columnNames: ['sent'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('email');
  }

}
