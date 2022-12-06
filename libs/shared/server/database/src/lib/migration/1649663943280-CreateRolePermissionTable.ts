import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class CreateRolePermissionTable1649663943280 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rolePermission',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'roleId',
            type: 'int',
          },
          {
            name: 'permissionId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'rolePermission',
      new TableIndex({
        name: 'IDX_P_ROLE_ID',
        columnNames: ['roleId'],
      }),
    );

    await queryRunner.createIndex(
      'rolePermission',
      new TableIndex({
        name: 'IDX_P_PERMISSION_Id',
        columnNames: ['permissionId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rolePermission');
  }

}
