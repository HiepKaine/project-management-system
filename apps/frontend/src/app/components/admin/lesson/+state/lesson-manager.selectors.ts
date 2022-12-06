import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LESSON_MANAGER_FEATURE_KEY, State } from './lesson-manager.reducer';

export const getLessonManagerState = createFeatureSelector<State>(
  LESSON_MANAGER_FEATURE_KEY
);

export const getLessonList = createSelector(
  getLessonManagerState,
  (state: State) => state.list
);
