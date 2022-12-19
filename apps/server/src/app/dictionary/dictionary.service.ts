import { Connection } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Dictionary } from './types';
import { Subject } from '../subject/subject.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class DictionaryService {
  constructor(private connection: Connection) {}

  async getData(): Promise<Dictionary> {
    const subject = await this.connection.getRepository(Subject).find();
    const student = await this.connection.getRepository(Student).find();
    return { subject, student };
  }
}
