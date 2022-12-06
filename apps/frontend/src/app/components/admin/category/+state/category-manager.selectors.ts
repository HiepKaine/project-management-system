import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  CATEGORY_MANAGER_FEATURE_KEY,
  State,
} from './category-manager.reducer';

export const getCategoryManagerState = createFeatureSelector<State>(
  CATEGORY_MANAGER_FEATURE_KEY
);


export const getCategoryList = createSelector(
  getCategoryManagerState,
  (state: State) => state.list
);

