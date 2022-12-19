import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Subject } from '@frontend/models/subject.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectService extends BaseService<Subject> {
  public override url = 'subject';
}
