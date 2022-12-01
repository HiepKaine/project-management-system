import { Injectable } from '@angular/core';

import {
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { CategoryService } from '../category.service';
import * as CategoryManagerActions from './category-manager.actions';

@Injectable()
export class CategoryManagerEffects {
  fetchCategoryRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryManagerActions.fetchCategoryRequested),
      switchMap(({ payload }) => this.categoryService.get(payload)),
      map((result: ApiPaginateResponse<Category>) => CategoryManagerActions.fetchCategorySuccessed({ payload: result }))
    )
  );

  removeCategoryRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryManagerActions.removeCategoryRequested),
      switchMap(({ payload }) => forkJoin([this.categoryService.delete(payload.id), of(payload)])),
      map(([result, category]) => CategoryManagerActions.removeCategorySuccessed({ payload: category }))
    )
  );

  constructor(private readonly actions$: Actions, private categoryService: CategoryService) { }
}
