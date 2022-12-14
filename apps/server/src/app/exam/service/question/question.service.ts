import { Connection, EntityTarget, Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { pick, zip } from 'lodash';

import * as xlsx from 'xlsx';
import { WorkSheet } from 'xlsx';
import { Answer } from '../../answer.entity';
import { Question } from '../../question.entity';
import { CreateQuestionDto, UpdateQuestionDto } from '../../types';

@Injectable()
export class QuestionService extends BaseService<Question> {
  public entity: EntityTarget<Question> = Question;
  public repository: Repository<Question> =
    this.connection.getRepository(Question);

  constructor(private connection: Connection) {
    super();
  }

  async createQuestion(data: CreateQuestionDto): Promise<Question> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const questionEntity = await this.repository.create(
        pick(data, ['question', 'categoryId', 'note', 'readingContentId'])
      );
      const answerEntities = data.answers.map((item) =>
        this.connection
          .getRepository(Answer)
          .create({ answer: item.answer, isCorrect: item.isCorrect })
      );
      for (const answerEntity of answerEntities) {
        const answer = await this.connection.manager.save(answerEntity);
        if (!Array.isArray(questionEntity.answers)) {
          questionEntity.answers = [answer];
        } else {
          questionEntity.answers.push(answer);
        }
      }
      const question = await this.connection.manager.save(questionEntity);
      await queryRunner.commitTransaction();
      return question;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async updateQuestion(
    questionId: number,
    data: UpdateQuestionDto
  ): Promise<Question> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await this.repository.update(
        questionId,
        pick(data, ['question', 'categoryId', 'note', 'readingContentId'])
      );
      const answerEntities = await this.connection
        .getRepository(Answer)
        .createQueryBuilder('answer')
        .where('answer.questionId = :questionId', { questionId })
        .getMany();
      if (
        !Array.isArray(data.answers) ||
        data.answers.length !== 4 ||
        answerEntities.length !== 4
      ) {
        throw new BadRequestException('Chỉ hỗ trợ câu hỏi có 4 đáp án');
      }
      const archive = zip(data.answers, answerEntities);
      for (const item of archive) {
        if (Array.isArray(item) && item.length > 0) {
          await this.connection
            .getRepository(Answer)
            .createQueryBuilder()
            .update()
            .set({
              answer: item[0].answer,
              isCorrect: item[0].isCorrect,
            })
            .where('id = :id', { id: item[1].id })
            .execute();
        }
      }
      await queryRunner.commitTransaction();
      return this.find(questionId, { relations: ['answers'] });
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async importQuestion(filePath: string): Promise<boolean> {
    const wb = xlsx.readFile(`${__dirname}/public/${filePath}`);
    const sheet: WorkSheet = wb.Sheets[wb.SheetNames[0]];
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const entities = [];
    for (let R = range.s.r; R <= range.e.r; ++R) {
      const entity: Array<string> = [];
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { c: C, r: R };
        const cellRef = xlsx.utils.encode_cell(cellAddress);
        if (sheet[cellRef]) {
          entity.push(sheet[cellRef]?.v);
        }
      }
      if (entity.length) {
        if (entity.length === 8) {
          entities.push(entity);
        } else {
          throw new BadRequestException(
            `Dữ liệu dòng ${R + 1} không đúng định dạng`
          );
        }
      }
    }
    if (entities.length > 1) {
      entities.shift();
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.startTransaction();
      try {
        for (const item of entities) {
          const questionEntity = await this.repository.create({
            question: item[0],
            categoryId: item[1],
            note: item[7],
          });
          const answers = [
            { answer: item[2], isCorrect: Number(item[6]) === 1 },
            { answer: item[3], isCorrect: Number(item[6]) === 2 },
            { answer: item[4], isCorrect: Number(item[6]) === 3 },
            { answer: item[5], isCorrect: Number(item[6]) === 4 },
          ];
          const answerEntities = answers.map((i) =>
            this.connection.getRepository(Answer).create(i)
          );
          questionEntity.answers = await this.connection.manager.save(
            answerEntities
          );
          await this.connection.manager.save(questionEntity);
        }
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    }

    return true;
  }

  async getRamdomQuestion(
    caregoryIds: number[],
    questionCount: number
  ): Promise<Question[]> {
    return this.repository
      .createQueryBuilder('question')
      .leftJoinAndSelect('question.category', 'category')
      .where(`category.id IN (${caregoryIds.join(',')})`)
      .orderBy('RAND()')
      .take(questionCount)
      .getMany();
  }
}
