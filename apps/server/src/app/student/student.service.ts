import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentService extends BaseService<Student> {
  public entity: EntityTarget<Student> = Student;
  repository: Repository<Student> = this.connection.getRepository(Student);
  constructor(private connection: Connection) {
    super();
  }
}
