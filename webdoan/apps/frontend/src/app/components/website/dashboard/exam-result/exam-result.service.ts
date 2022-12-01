import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { TestSession } from '@frontend/models/test-session.model';

@Injectable({
  providedIn: 'root',
})
export class ExamResultService extends BaseService<TestSession> {
  public override url = 'test-session';
}
