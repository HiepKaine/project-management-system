import { Student } from '../student/student.entity';
import { Subject } from '../subject/subject.entity';

export type Dictionary = {
  subject: Subject[];
  student: Student[];
};
