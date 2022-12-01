import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateCourseChapterLessonTable1656928134526 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'courseChapterLesson',
            columns: [
              {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
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
            ],
          }),
          true,
        );
    
        await queryRunner.createIndex(
          'courseChapterLesson',
          new TableIndex({
            name: 'IDX_COURSE_CHAPTER_LESSON_CCID',
            columnNames: ['courseChapterId'],
          }),
        );

        await queryRunner.createIndex(
            'courseChapterLesson',
            new TableIndex({
              name: 'IDX_COURSE_CHAPTER_LESSON_LID',
              columnNames: ['lessonId'],
            }),
          );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courseChapter');
      }
    

}
