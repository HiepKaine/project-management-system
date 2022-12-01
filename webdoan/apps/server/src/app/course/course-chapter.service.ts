import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { CourseChapter } from './course-chapter.entity';

@Injectable()
export class CourseChapterService extends BaseService<CourseChapter> {
  public entity: EntityTarget<CourseChapter> = CourseChapter;
  public repository: Repository<CourseChapter> = this.connection.getRepository(CourseChapter);

  constructor(private connection: Connection) {
    super();
  }

  async isExist(courseId: number, courseChapterId: number) :Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("id = :courseChapterId AND courseId =:courseId", { courseChapterId, courseId })
      .getCount() > 0;
  }
}
