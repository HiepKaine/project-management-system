import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Teacher } from '@frontend/models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService extends BaseService<Teacher> {
  override url = 'teacher';
}
