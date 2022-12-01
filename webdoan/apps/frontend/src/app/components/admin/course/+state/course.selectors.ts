import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  COURSE_FEATURE_KEY,
  State,
} from './course.reducer';

export const getCourseState = createFeatureSelector<State>(COURSE_FEATURE_KEY);


export const getListCourse = createSelector(
  getCourseState,
  (state: State) => state.list
);

