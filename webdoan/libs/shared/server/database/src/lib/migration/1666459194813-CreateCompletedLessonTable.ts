import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateCompletedLessonTable1666459194813 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "completedLesson",
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
            name: 'courseChapterId',
            type: 'int',
          },
          {
            name: 'lessonId',
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
      'completedLesson',
      new TableIndex({
        name: 'IDX_COMPLETED_LESSON_UID',
        columnNames: ['userId'],
      }),
    );
    await queryRunner.createIndex(
      'completedLesson',
      new TableIndex({
        name: 'IDX_COMPLETED_LESSON_CCID',
        columnNames: ['courseChapterId'],
      }),
    );

    await queryRunner.createIndex(
      'completedLesson',
      new TableIndex({
        name: 'IDX_COMPLETED_LESSON_LID',
        columnNames: ['lessonId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('completedLesson')
  }
}
