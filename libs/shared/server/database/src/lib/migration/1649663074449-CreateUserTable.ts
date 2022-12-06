import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
} from 'typeorm';

export class CreateUserTable1649663074449 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'firstName',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'lastName',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'position',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'organization',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            default: 1,
            type: 'int',
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
            default: "''"
          },
          {
            name: 'verifyToken',
            isNullable: true,
            type: 'varchar',
          },
          {
            name: 'verified',
            default: 0,
            type: 'boolean',
          },
          {
            name: 'verifiedAt',
            isNullable: true,
            type: 'datetime',
          },
          {
            name: 'loginFailed',
            default: 0,
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
      }),
      true,
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_USERNAME',
        columnNames: ['username'],
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_FIRST_NAME',
        columnNames: ['firstName'],
      }),
    );

    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_LAST_NAME',
        columnNames: ['lastName'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }

}
