import { Injectable } from '@angular/core';

import {
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';

import { CourseService } from '../course.service';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  fetchListCourseRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.fetchListCourseRequested),
      switchMap(({ payload }) => this.courseService.get(payload ?? {})),
      map((result: ApiPaginateResponse<Course>) => CourseActions.fetchListCourseSuccessed({ payload: result }))
    )
  );

  removeCourseRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.removeCourseRequested),
      switchMap(({ payload }) => forkJoin([this.courseService.delete(payload.id), of(payload)])),
      tap((data) => {
        this.notifiationService.success('Thành công', `Khoá học ${data[1].name} đã được xoá`)
      }),
      map((data) => CourseActions.removeCourseSuccessed({ payload: data[1] })),
    )
  );

  constructor(private readonly actions$: Actions, private courseService: CourseService, private notifiationService: NotificationService) { }
}
