import { ApiPaginateResponse } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import * as CourseActions from './course.actions';

export const COURSE_FEATURE_KEY = 'course';

export interface State {
  list?: ApiPaginateResponse<Course>
}

export const initialState: State = {};

const courseReducer = createReducer(
  initialState,
  on(CourseActions.fetchListCourseSuccessed, (state, { payload }) => ({ ...state, ...{ list: payload } })),
  on(CourseActions.removeCourseSuccessed, (state, { payload }) => {
    if (state.list && state.list.data && Array.isArray(state.list.data)) {
      const items = state.list.data.filter(item => item.id !== payload.id)
      return { ...state, ...{ list: { ...state.list, ...{ data: items } } } };
    } else {
      return state;
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return courseReducer(state, action);
}
