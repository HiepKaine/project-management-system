import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { CourseChapterLesson } from './course-chapter-lesson.entity';

@Injectable()
export class CourseChapterLessonService extends BaseService<CourseChapterLesson> {
  public entity: EntityTarget<CourseChapterLesson> = CourseChapterLesson;
  public repository: Repository<CourseChapterLesson> = this.connection.getRepository(CourseChapterLesson);

  constructor(private connection: Connection){
    super()
  }

  async isExist(courseChapterId: number, lessonId: number) :Promise<boolean> {
    return await this.repository
    .createQueryBuilder()
    .where("courseChapterId = :courseChapterId AND lessonId =:lessonId", { courseChapterId, lessonId })
    .getCount() > 0;
  }
}
