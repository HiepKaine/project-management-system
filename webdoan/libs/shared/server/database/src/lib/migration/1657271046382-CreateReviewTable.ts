import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateReviewTable1657271046382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'review',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'image',
                type: 'varchar',
              },
              {
                name: 'user',
                type: 'varchar',
              },
              {
                name: 'review',
                type: 'text',
              },
              {
                name: 'rateCount',
                type: 'int',
              },
              {
                name: 'reviewableType',
                type: 'varchar',
              },
              {
                name: 'reviewableId',
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
            ],
          }),
          true,
        );

        await queryRunner.createIndex(
          'review',
          new TableIndex({
            name: 'IDX_REVIEW_RID',
            columnNames: ['reviewableId'],
          }),
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('review');
      }
    

}
