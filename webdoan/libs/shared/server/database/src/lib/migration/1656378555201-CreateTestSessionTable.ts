import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateTestSessionTable1656378555201 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'testSession',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int'
          },
          {
            name: 'examPackId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'examId',
            type: 'int'
          },
          {
            name: 'examCodeId',
            type: 'int'
          },
          {
            name: 'score',
            type: 'float',
            default: 0,
          },
          {
            name: 'startTime',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'completedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
          },
          {
            name: 'correctQuestion',
            type: 'int',
            default: 0,
          },
          {
            name: 'inCorrectQuestion',
            type: 'int',
            default: 0,
          },
          {
            name: 'skipQuestion',
            type: 'int',
            default: 0,
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
      'testSession',
      new TableIndex({
        name: 'IDX_TESTSESSION_UID',
        columnNames: ['userId']
      })
    )

    await queryRunner.createIndex(
      'testSession',
      new TableIndex({
        name: 'IDX_TESTSESSION_EPID',
        columnNames: ['examPackId']
      })
    )

    await queryRunner.createIndex(
      'testSession',
      new TableIndex({
        name: 'IDX_TESTSESSION_EID',
        columnNames: ['examId']
      })
    )

    await queryRunner.createIndex(
      'testSession',
      new TableIndex({
        name: 'IDX_TESTSESSION_ECID',
        columnNames: ['examCodeId']
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('testSession')
  }

}
