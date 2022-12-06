import { Injectable } from '@angular/core';

import {
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import { Option } from '@frontend/models/option.model';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { OptionService } from '../option.service';
import * as OptionManagerActions from './option-manager.actions';

@Injectable()
export class OptionManagerEffects {
  fetchOptionRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OptionManagerActions.fetchOptionRequested),
      switchMap(({ payload }) => this.optionService.get(payload)),
      map((result: ApiPaginateResponse<Option>) => OptionManagerActions.fetchOptionSuccessed({ payload: result }))
    )
  );

  removeOptionRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OptionManagerActions.removeOptionRequested),
      switchMap(({ payload }) => forkJoin([this.optionService.delete(payload.id), of(payload)])),
      map(([result, option]) => OptionManagerActions.removeOptionSuccessed({ payload: option }))
    )
  );

  constructor(private readonly actions$: Actions, private optionService: OptionService) { }
}
