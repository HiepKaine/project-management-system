import { Injectable } from '@angular/core';

import { Option } from '@frontend/models/option.model';
import { BaseService } from '@frontend/common';

@Injectable({
  providedIn: 'root',
})
export class OptionService extends BaseService<Option> {
  public override url = '/option';
}
