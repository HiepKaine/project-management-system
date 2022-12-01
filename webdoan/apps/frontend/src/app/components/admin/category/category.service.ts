import { Injectable } from '@angular/core';

import { BaseService } from '@frontend/common';
import { Category } from '@frontend/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category>{
  public override url = '/category';
}
