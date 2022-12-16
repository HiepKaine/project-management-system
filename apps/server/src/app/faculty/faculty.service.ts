import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Faculty } from './faculty.entity';

@Injectable()
export class FacultyService extends BaseService<Faculty> {
  entity: EntityTarget<Faculty> = Faculty;
  repository: Repository<Faculty> = this.connection.getRepository(Faculty);
  constructor(private connection: Connection) {
    super();
  }
}
