import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserChannelTable1653700404121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: 'userChannel',
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
                        type: 'int',
                    }, 
                    {
                        name: 'channelId',
                        type: 'int',
                    }, 
                    {
                        name: 'unreadStatus',
                        type: 'boolean',
                        default: false,
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
            'userChannel',
            new TableIndex({
              name: 'IDX_USERCHANNEL_UID',
              columnNames: ['userId'],
            }),
          );

        await queryRunner.createIndex(
            'userChannel',
            new TableIndex({
              name: 'IDX_USERCHANNEL_CID',
              columnNames: ['channelId'],
            }),
          );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userChannel')
    }

}
