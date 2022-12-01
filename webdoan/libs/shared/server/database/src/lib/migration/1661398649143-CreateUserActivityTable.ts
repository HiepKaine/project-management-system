import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUserActivityTable1661398649143 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userActivity',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'ipId',
            type: 'int',
          },
          {
            name: 'type',
            type: 'varchar',
            default: '""'
          },
          {
            name: 'agent',
            type: 'varchar',
            default: '""'
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
      true
    );
    await queryRunner.createIndex(
      'userIp',
      new TableIndex({
        name: 'IDX_USERA_ID',
        columnNames: ['userId'],
      })
    );
    await queryRunner.createIndex(
      'userIp',
      new TableIndex({
        name: 'IDX_USER_IPID',
        columnNames: ['ipId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userActivity');
  }

}
