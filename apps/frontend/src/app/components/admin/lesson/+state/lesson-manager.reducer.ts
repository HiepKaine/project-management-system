import { ApiPaginateResponse } from '@frontend/common';
import { Action, createReducer, on } from '@ngrx/store';

import { Lesson } from '../../../../models/lesson.model';
import * as LessonManagerActions from './lesson-manager.actions';

export const LESSON_MANAGER_FEATURE_KEY = 'lessonManager';

export interface State {
  list?: ApiPaginateResponse<Lesson>;
}

export const initialState: State = {};

const lessonManagerReducer = createReducer(
  initialState,
  on(LessonManagerActions.fetchLessonSuccessed, (state, { payload }) => ({
    ...state,
    ...{ list: payload },
  })),
  on(LessonManagerActions.removeLessonSuccessed, (state, { payload }) => {
    if (state.list && state.list.data && Array.isArray(state.list.data)) {
      const items = state.list.data.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...{ deletedAt: new Date() } };
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
  return lessonManagerReducer(state, action);
}
