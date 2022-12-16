import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Classes } from '@frontend/models/class.model';

@Injectable({
  providedIn: 'root',
})
export class ClassService extends BaseService<Classes> {
  public override url = '/class';
}
