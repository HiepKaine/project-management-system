import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';

@Injectable()
export class AttendanceService extends BaseService<Attendance> {
  public entity: EntityTarget<Attendance> = Attendance;
  public repository: Repository<Attendance> =
    this.connection.getRepository(Attendance);

  constructor(private connection: Connection) {
    super();
  }
}
