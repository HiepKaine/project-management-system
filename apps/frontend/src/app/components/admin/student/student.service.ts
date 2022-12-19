import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Student } from '@frontend/models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService extends BaseService<Student> {
  public override url = 'student';
}
