import { Injectable } from '@nestjs/common';
import { BaseService } from '@server/common';
import { pick } from 'lodash';
import { Connection, EntityTarget, Repository } from 'typeorm';
import { Student } from './student.entity';
import { createStudentDto, updateStudentDto } from './types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentService extends BaseService<Student> {
  public entity: EntityTarget<Student> = Student;
  repository: Repository<Student> = this.connection.getRepository(Student);
  constructor(private connection: Connection) {
    super();
  }

  async addStudent(data: createStudentDto): Promise<Student> {
    return this.create({
      ...pick(data, [
        'facultyId',
        'classId',
        'name',
        'image',
        'studentYear',
        'idCard',
        'phoneNumber',
        'sex',
        'date',
        'address',
        'ethnic',
        'religion',
        'fatherName',
        'fatherJob',
        'fatherPhoneNumber',
        'motherName',
        'motherJob',
        'motherPhoneNumber',
        'note',
      ]),
      ...{ studentCode: uuidv4() },
    });
  }

  async updateStudent(
    studentId: number,
    data: updateStudentDto
  ): Promise<Student> {
    const student = await this.connection
      .getRepository(Student)
      .findOne({ where: { id: studentId } });

    return this.update(studentId, {
      ...pick(data, [
        'facultyId',
        'classId',
        'name',
        'image',
        'studentYear',
        'idCard',
        'phoneNumber',
        'sex',
        'date',
        'address',
        'ethnic',
        'religion',
        'fatherName',
        'fatherJob',
        'fatherPhoneNumber',
        'motherName',
        'motherJob',
        'motherPhoneNumber',
        'note',
      ]),
      ...{ studentCode: student.studentCode },
    });
  }
}
