import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateUserNotificationUnreadTable1654074108824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name: "userNotificationUnread",
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
                        name: 'systemNotificationId',
                        type: 'int',
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
            'userNotificationUnread',
            new TableIndex({
              name: 'IDX_USERNOTIUNREAD_UID',
              columnNames: ['userId'],
            }),
          );

        await queryRunner.createIndex(
            'userNotificationUnread',
            new TableIndex({
              name: 'IDX_USERNOTIUNREAD_SID',
              columnNames: ['systemNotificationId'],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('userNotificationUnread')
    }

}
