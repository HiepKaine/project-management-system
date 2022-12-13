import { MigrationInterface, QueryRunner, Table } from 'typeorm';

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
            name: 'studentName',
            type: 'varchar',
          },
          {
            name: 'studentCode',
            type: 'varchar',
          },
          {
            name: 'subjects',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('score');
  }
}
