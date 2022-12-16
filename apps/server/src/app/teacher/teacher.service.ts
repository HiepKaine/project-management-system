import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { pick } from 'lodash';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { createTeacherDto, updateTeacherDto } from './types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeacherService extends BaseService<Teacher> {
  public entity: EntityTarget<Teacher> = Teacher;
  repository: Repository<Teacher> = this.connection.getRepository(Teacher);

  constructor(private connection: Connection) {
    super();
  }

  async createTeacher(data: createTeacherDto): Promise<Teacher> {
    return this.create({
      ...pick(data, [
        'name',
        'phoneNumber',
        'address',
        'sex',
        'level',
        'email',
        'nationality',
        'divisionId',
      ]),
      ...{ teacherCode: uuidv4() },
    });
  }

  async updateTeacher(
    teacherId: number,
    data: updateTeacherDto
  ): Promise<Teacher> {
    const teacher = await this.connection
      .getRepository(Teacher)
      .findOne({ where: { id: teacherId } });

    return this.update(teacherId, {
      ...pick(data, [
        'name',
        'phoneNumber',
        'address',
        'sex',
        'level',
        'email',
        'nationality',
        'divisionId',
      ]),
      ...{ teacherCode: teacher.teacherCode },
    });
  }
}
