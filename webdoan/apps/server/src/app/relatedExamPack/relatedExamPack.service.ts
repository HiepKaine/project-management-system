import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { RelatedExamPack } from './relatedExamPack.entity';

@Injectable()
export class RelatedExamPackService extends BaseService<RelatedExamPack>{
  public entity: EntityTarget<RelatedExamPack> = RelatedExamPack;
  public repository: Repository<RelatedExamPack> = this.connection.getRepository(RelatedExamPack);

  constructor(private connection: Connection) {
    super()
  }

  async isExamPackRelateToCourse(examPackId: number, courseId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("examPackId = :examPackId AND relatedId = :courseId AND relatedType = :relatedType", { examPackId, courseId, relatedType: 'course' })
      .getCount() > 0
  }

  async isExamPackRelateToExamPack(examPackId: number, sourceExamPackId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("examPackId = :examPackId", { examPackId })
      .andWhere("relatedId = :sourceExamPackId", { sourceExamPackId })
      .andWhere("relatedType = :relatedType", { relatedType: 'exam-pack' })
      .getCount() > 0
  }
}
