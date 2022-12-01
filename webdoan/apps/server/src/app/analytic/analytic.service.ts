import { Injectable } from '@nestjs/common';
import { Connection, EntityTarget, FindManyOptions } from 'typeorm';

@Injectable()
export class AnalyticService {
  constructor(
    private connection: Connection
  ) { }

  async getObjectCount<T>(entity: EntityTarget<T>, options?: FindManyOptions): Promise<number> {
    if (options) {
      return this.connection.getRepository(entity).count(options);
    } else {
      return this.connection.getRepository(entity).count();
    }
  }
}
