import { ApiPaginateResponse } from '@frontend/common';
import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import { Category } from '../../../../models/category.model';
import * as CategoryManagerActions from './category-manager.actions';

export const CATEGORY_MANAGER_FEATURE_KEY = 'categoryManager';

export interface State {
  list?: ApiPaginateResponse<Category>
}

export const initialState: State = {};

const categoryManagerReducer = createReducer(
  initialState,
  on(CategoryManagerActions.fetchCategorySuccessed, (state, { payload }) => ({
    ...state,
    ...{ list: payload }
  })),
  on(CategoryManagerActions.removeCategorySuccessed, (state, { payload }) => {
    if (state.list && state.list.data && Array.isArray(state.list.data)) {
      const items = state.list.data.map(item => {
        if (item.id === payload.id) {
          return { ...item, ...{ deletedAt: new Date() } }
        }
        return item;
      });
      return { ...state, ...{ list: { ...state.list, ...{ data: items } } } };
    } else {
      return state;
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return categoryManagerReducer(state, action);
}
