import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { RelatedCourse } from './relatedCourse.entity';

@Injectable()
export class RelatedCourseService  extends BaseService<RelatedCourse>{
  public entity: EntityTarget<RelatedCourse> = RelatedCourse;
  public repository: Repository<RelatedCourse> = this.connection.getRepository(RelatedCourse);

  constructor(private connection: Connection) {
    super()
  }

  async isCourseRelateToCourse(courseId: number, relatedId: number): Promise<boolean> {
    return await this.repository
    .createQueryBuilder()
    .where("courseId = :courseId AND relatedId = :relatedId AND relatedType = :relatedType", { courseId, relatedId, relatedType : 'course' })
    .getCount() > 0
  }

  async isCourseRelateToExamPack(courseId: number, relatedId: number): Promise<boolean> {
    return await this.repository
    .createQueryBuilder()
    .where("courseId = :courseId AND relatedId = :relatedId AND relatedType = :relatedType", { courseId, relatedId, relatedType : 'exampack' })
    .getCount() > 0
  }
}
