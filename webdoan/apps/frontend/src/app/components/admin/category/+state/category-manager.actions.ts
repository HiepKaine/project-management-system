import { ApiPaginateResponse } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import {
  createAction,
  props,
} from '@ngrx/store';

export const removeCategoryRequested = createAction(
  '[CategoryManager/API] remove category requested',
  props<{ payload: Category }>()
);

export const removeCategorySuccessed = createAction(
  '[CategoryManager/API] remove category successed',
  props<{ payload: Category }>()
);

export const fetchCategoryRequested = createAction(
  '[CategoryManager/API] fetch category requested',
  props<{ payload?: { keyword?: string, page?: number } }>()
);

export const fetchCategorySuccessed = createAction(
  '[CategoryManager/API] fetch category successed',
  props<{ payload: ApiPaginateResponse<Category> }>()
);
