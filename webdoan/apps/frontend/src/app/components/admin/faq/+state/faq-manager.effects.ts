import { Injectable } from '@angular/core';

import {
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { FaqService } from '../faq.service';
import * as FaqManagerActions from './faq-manager.actions';
import { Faq } from '@frontend/models/faq.modal';

@Injectable()
export class FaqManagerEffects {
  fetchFaqRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaqManagerActions.fetchFaqRequested),
      switchMap(({ payload }) => this.faqService.get(payload)),
      map((result: ApiPaginateResponse<Faq>) => FaqManagerActions.fetchFaqSuccessed({ payload: result }))
    )
  );

  removeFaqRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FaqManagerActions.removeFaqRequested),
      switchMap(({ payload }) => forkJoin([this.faqService.delete(payload.id), of(payload)])),
      map(([result, faq]) => FaqManagerActions.removeFaqSuccessed({ payload: faq }))
    )
  );

  constructor(private readonly actions$: Actions, private faqService: FaqService) { }
}
