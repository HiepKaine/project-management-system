import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Division } from './division.entity';

@Injectable()
export class DivisionService extends BaseService<Division> {
  public entity: EntityTarget<Division> = Division;
  repository: Repository<Division> = this.connection.getRepository(Division);

  constructor(private connection: Connection) {
    super();
  }
}
