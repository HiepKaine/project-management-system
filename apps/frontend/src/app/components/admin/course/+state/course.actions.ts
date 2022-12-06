import { ApiPaginateResponse } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import {
  createAction,
  props,
} from '@ngrx/store';

export const fetchListCourseRequested = createAction('[Course/API] fetch list course requested', props<{ payload: { page?: number, categoryId?: number, keyword?: string } }>());
export const fetchListCourseSuccessed = createAction('[Course/API] fetch list course successed', props<{ payload: ApiPaginateResponse<Course> }>());

export const removeCourseRequested = createAction('[Course/API] remove course requested', props<{ payload: Course }>());
export const removeCourseSuccessed = createAction('[Course/API] remove course successed', props<{ payload: Course }>());

