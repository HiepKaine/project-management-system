import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { meanBy } from 'lodash';
import { Connection, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Course } from '../course/course.entity';
import { ExamPack } from '../exam-pack/exam-pack.entity';
import { Review } from './review.entity';
import { CreateReviewDto } from './types';
@Injectable()
export class ReviewService extends BaseService<Review> {
  public entity: EntityTarget<Review> = Review;
  public repository: Repository<Review> = this.connection.getRepository(Review);

  constructor(private connection: Connection) {
    super()
  }

  async createReview(data: CreateReviewDto): Promise<Review> {
    let reviewId
    let reviewableType;
    if (data.type === 1) {
      reviewableType = 'course'
    }
    else if (data.type === 2) {
      reviewableType = 'exampack'
    }
    else {
      throw new BadRequestException("Loại nội dung không tồn tại.")
    }
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const reviewDto: QueryDeepPartialEntity<Review> = {
        ...data,
        reviewableType: reviewableType
      }

      const { identifiers } = await queryRunner.manager.createQueryBuilder()
        .insert()
        .into(Review)
        .values([reviewDto])
        .execute();
      reviewId = identifiers[0].id

      const reviews = await queryRunner.manager.getRepository(Review).find({ where: { reviewableId: data.reviewableId, reviewableType: reviewableType } });
      
      const averageRate = Math.round(meanBy(reviews, 'rateCount'))

      if (reviewableType === 'course') {
        await queryRunner.manager.createQueryBuilder()
          .update(Course)
          .set({ rateCount: reviews.length, rateAverage: averageRate })
          .where("id = :id", { id: data.reviewableId })
          .execute()
      } else {
        await queryRunner.manager.createQueryBuilder()
          .update(ExamPack)
          .set({ rateCount: reviews.length, rateAverage: averageRate })
          .where("id = :id", { id: data.reviewableId })
          .execute()
      }


      await queryRunner.commitTransaction()
    } catch (err) {
      await queryRunner.rollbackTransaction()
    } finally {
      await queryRunner.release()
    }
    return this.repository.findOne(reviewId)
  }

  async destroyReview(reviewId: number): Promise<DeleteResult> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const review = await queryRunner.manager.getRepository(Review).findOne({ where: { id: reviewId } });

      await queryRunner.manager.createQueryBuilder()
        .delete()
        .from(Review)
        .where("id = :id", { id: reviewId })
        .execute()

      const reviews = await queryRunner.manager.getRepository(Review).find({ where: { reviewableId: review.reviewableId, reviewableType: review.reviewableType } });

      const averageRate = Math.round(meanBy(reviews, 'rateCount'))

      if (review.reviewableType === 'course') {
        await queryRunner.manager.createQueryBuilder()
          .update(Course)
          .set({ rateCount: reviews.length })
          .where("id = :id", { id: review.reviewableId, rateAverage: averageRate })
          .execute()
      } else {
        await queryRunner.manager.createQueryBuilder()
          .update(ExamPack)
          .set({ rateCount: reviews.length })
          .where("id = :id", { id: review.reviewableId, rateAverage: averageRate })
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
}
