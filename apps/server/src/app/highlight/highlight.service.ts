import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, DeleteResult, EntityTarget, Repository } from 'typeorm';
import { Highlight } from './highlight.entity';

@Injectable()
export class HighlightService extends BaseService<Highlight>{
  public entity: EntityTarget<Highlight> = Highlight;
  public repository: Repository<Highlight> = this.connection.getRepository(Highlight);

  constructor(private connection: Connection) {
    super()
  }

  async isExistHighlightCourse(resourceId: number, relatedId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("resourceId = :resourceId", { resourceId })
      .andWhere('resourceType = :resourceType', { resourceType: 'course' })
      .andWhere('relatedId = :relatedId', { relatedId })
      .andWhere('relatedType = :relatedType', { relatedType: 'exam-pack' })
      .getCount() > 0;
  }

  async isExistHighlightExamPack(resourceId: number, relatedId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("resourceId = :resourceId", { resourceId })
      .andWhere('resourceType = :resourceType', { resourceType: 'exam-pack' })
      .andWhere('relatedId = :relatedId', { relatedId })
      .andWhere('relatedType = :relatedType', { relatedType: 'course' })
      .getCount() > 0;
  }

  async createHighlightCourse(courseId: number, examPackId: number): Promise<Highlight> {
    return this.create({
      resourceId: courseId,
      resourceType: 'course',
      relatedId: examPackId,
      relatedType: 'exam-pack'
    })
  }

  async createHighlightExamPack(examPackId: number, courseId: number): Promise<Highlight> {
    return this.create({
      resourceId: examPackId,
      resourceType: 'exam-pack',
      relatedId: courseId,
      relatedType: 'course'
    })
  }

  async deleteHighlightCourse(courseId: number, examPackId: number): Promise<DeleteResult> {
    return this.repository.createQueryBuilder()
      .delete()
      .where('resourceId = :resourceId', { resourceId: courseId })
      .andWhere('resourceType = :resourceType', { resourceType: 'course' })
      .andWhere('relatedId = :relatedId', { relatedId: examPackId })
      .andWhere('relatedType = :relatedType', { relatedType: 'exam-pack' })
      .execute();
  }

  async deleteHighlightExamPack(examPackId: number, courseId: number): Promise<DeleteResult> {
    return this.repository.createQueryBuilder()
      .delete()
      .where('resourceId = :resourceId', { resourceId: examPackId })
      .andWhere('resourceType = :resourceType', { resourceType: 'exam-pack' })
      .andWhere('relatedId = :relatedId', { relatedId: courseId })
      .andWhere('relatedType = :relatedType', { relatedType: 'course' })
      .execute();
  }
}
