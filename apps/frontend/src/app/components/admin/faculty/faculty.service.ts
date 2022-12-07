import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Faculty } from '@frontend/models/faculty.model';

@Injectable({
  providedIn: 'root',
})
export class FacultyService extends BaseService<Faculty> {
  public override url = 'faculty';
}
