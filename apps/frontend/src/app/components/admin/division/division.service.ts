import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Division } from '@frontend/models/division.model';

@Injectable({
  providedIn: 'root',
})
export class DivisionService extends BaseService<Division> {
  public override url = 'division';
}
