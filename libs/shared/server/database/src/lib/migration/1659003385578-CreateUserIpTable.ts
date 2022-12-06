import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUserIpTable1659003385578 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userIp',
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
            name: 'blocked',
            type: 'boolean',
            default: false
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
        name: 'IDX_USER_ID',
        columnNames: ['userId'],
      })
    );
    await queryRunner.createIndex(
      'userIp',
      new TableIndex({
        name: 'IDX_IP_ID',
        columnNames: ['ipId'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('userIp');
  }

}
