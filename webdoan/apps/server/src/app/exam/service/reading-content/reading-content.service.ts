import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { ExamQuestion } from '../../exam-question.entity';
import { Question } from '../../question.entity';
import { ReadingContent } from '../../reading-content.entity';

@Injectable()
export class ReadingContentService extends BaseService<ReadingContent> {
  public entity: EntityTarget<ReadingContent> = ReadingContent;
  public repository: Repository<ReadingContent> = this.connection.getRepository(ReadingContent);

  constructor(private connection: Connection) {
    super();
  }

  async removeReadingContentQuestion(examId: number, readingContentId: number): Promise<DeleteResult> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const questions = await queryRunner.manager.getRepository(Question).find({ where: { readingContentId } });
      for (const question of questions) {
        await queryRunner.manager.createQueryBuilder()
          .delete()
          .from(ExamQuestion)
          .where("examQuestion.examId = :examId", { examId })
          .andWhere("examQuestion.questionId = :questionId", { questionId: question.id })
          .execute()
      }

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
    return;
  }

  async removeReadingContentItem(readingContentId: number) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.createQueryBuilder()
        .softDelete()
        .from(ReadingContent)
        .where("id = :id", { id: readingContentId })
        .execute()

      await queryRunner.manager.createQueryBuilder()
        .softDelete()
        .from(Question)
        .where("readingContentId = :readingContentId", { readingContentId: readingContentId })
        .execute()

      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
    return;
  }
}
