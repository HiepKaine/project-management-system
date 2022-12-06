import { Injectable } from '@angular/core';

import { BaseService } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import { Lesson } from '@frontend/models/lesson.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService extends BaseService<Lesson> {
  public override url = '/lesson';
}
export class CategoryService extends BaseService<Category> {
  public override url = '/category';
}
