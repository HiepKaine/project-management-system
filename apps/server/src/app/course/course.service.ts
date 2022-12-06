import {
  Connection,
  EntityTarget,
  FindOneOptions,
  Repository,
} from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';

import { Course } from './course.entity';
@Injectable()
export class CourseService extends BaseService<Course>{
  public entity: EntityTarget<Course> = Course;
  public repository: Repository<Course> = this.connection.getRepository(Course);
  constructor(private connection: Connection) {
    super()
  }

  async isExist(courseId: number): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("id = :courseId", { courseId })
      .getCount() > 0;
  }

  async isExistSlug(slug: string): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("slug = :slug", { slug })
      .getCount() > 0;
  }

  async findSlug(options: FindOneOptions): Promise<Course> {
    const item = await this.repository.findOne(options)
    if (!item) {
      throw new BadRequestException('Resource not found');
    }
    return item;
  }
}
