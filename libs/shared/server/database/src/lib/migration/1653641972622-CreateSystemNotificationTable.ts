import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateNotificationTable1653641972622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "systemNotification",
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'channelId',
                        type: 'int',
                    },
                    {
                        name: 'message',
                        type: 'varchar',
                    },
                    {
                        name: 'type',
                        type: 'int'
                    },
                    {
                        name: 'action',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'int',
                        isNullable: true
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
        );

        await queryRunner.createIndex(
            'systemNotification',
            new TableIndex({
              name: 'IDX_NOTIFICATIONCID',
              columnNames: ['channelId'],
            }),
          );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('systemNotification')
    }

}
