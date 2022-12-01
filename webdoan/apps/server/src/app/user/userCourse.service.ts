import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { UserCourse } from './userCourse.entity';

@Injectable()
export class UserCourseService extends BaseService<UserCourse>{
  public entity: EntityTarget<UserCourse> = UserCourse;
  public repository: Repository<UserCourse> = this.connection.getRepository(UserCourse);

  constructor(private connection: Connection) {
    super();
  }

  async isExist(userId : number, courseId : number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("userId = :userId AND courseId = :courseId", { userId, courseId})
      .getCount() > 0
  }
}
