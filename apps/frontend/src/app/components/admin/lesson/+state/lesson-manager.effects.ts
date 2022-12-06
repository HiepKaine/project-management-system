import { Injectable } from '@angular/core';

import { forkJoin, map, of, switchMap } from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import { Lesson } from '@frontend/models/lesson.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { LessonService } from '../lesson.service';
import * as LessonManagerActions from './lesson-manager.actions';

@Injectable()
export class LessonManagerEffects {
  fetchCategoryRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonManagerActions.fetchLessonRequested),
      switchMap(({ payload }) => this.lessonService.get(payload)),
      map((result: ApiPaginateResponse<Lesson>) =>
        LessonManagerActions.fetchLessonSuccessed({ payload: result })
      )
    )
  );

  removeLessonRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LessonManagerActions.removeLessonRequested),
      switchMap(({ payload }) =>
        forkJoin([this.lessonService.delete(payload.id), of(payload)])
      ),
      map(([result, lesson]) =>
        LessonManagerActions.removeLessonSuccessed({ payload: lesson })
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private lessonService: LessonService
  ) {}
}
