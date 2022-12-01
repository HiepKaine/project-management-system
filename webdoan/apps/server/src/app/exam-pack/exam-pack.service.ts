import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import {
  Connection,
  EntityTarget,
  FindOneOptions,
  Repository
} from 'typeorm';
import { ExamPack } from './exam-pack.entity';

@Injectable()
export class ExamPackService extends BaseService<ExamPack>{
  public entity: EntityTarget<ExamPack> = ExamPack;
  public repository: Repository<ExamPack> = this.connection.getRepository(ExamPack);

  constructor(private connection: Connection) {
    super();
  }

  async findSlug(options: FindOneOptions): Promise<ExamPack> {
    const item = await this.repository.findOne(options)
    if (!item) {
      throw new BadRequestException('Resource not found');
    }
    return item;
  }

  async isExistSlug(slug: string): Promise<boolean> {
    return await this.repository
      .createQueryBuilder()
      .where("slug = :slug", { slug })
      .getCount() > 0;
  }
}
