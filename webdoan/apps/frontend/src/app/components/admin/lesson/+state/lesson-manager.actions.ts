import { ApiPaginateResponse } from '@frontend/common';
import { Lesson } from '@frontend/models/lesson.model';
import { createAction, props } from '@ngrx/store';

export const removeLessonRequested = createAction(
  '[LessonManager/API] remove lesson requested',
  props<{ payload: Lesson }>()
);

export const removeLessonSuccessed = createAction(
  '[LessonManager/API] remove lesson successed',
  props<{ payload: Lesson }>()
);

export const fetchLessonRequested = createAction(
  '[LessonManager/API] fetch lesson requested',
  props<{ payload?: { keyword?: string; page?: number, categoryId?: number } }>()
);

export const fetchLessonSuccessed = createAction(
  '[LessonManager/API] fetch lesson successed',
  props<{ payload: ApiPaginateResponse<Lesson> }>()
);
