import {
  Connection,
  EntityTarget,
  Repository,
} from 'typeorm';

import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';

import { Category } from './category.entity';

@Injectable()
export class CategoryService extends BaseService<Category>{
  public entity: EntityTarget<Category> = Category;
  public repository: Repository<Category> = this.connection.getRepository(Category);
  constructor(private connection: Connection) {
    super();
  }

  async isExist(slug: string): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("slug = :slug", { slug })
      .getCount() > 0;
  }

}
