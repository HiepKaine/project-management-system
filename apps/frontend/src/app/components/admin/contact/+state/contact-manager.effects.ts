import { Injectable } from '@angular/core';

import {
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';

import { ApiPaginateResponse } from '@frontend/common';
import { Contact } from '@frontend/models/contact.model';
import {
  Actions,
  createEffect,
  ofType,
} from '@ngrx/effects';

import { ContactService } from '../contact.service';
import * as ContactManagerActions from './contact-manager.actions';

@Injectable()
export class ContactManagerEffects {
  fetchContactRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactManagerActions.fetchContactRequested),
      switchMap(({ payload }) => this.contactService.get(payload)),
      map((result: ApiPaginateResponse<Contact>) => ContactManagerActions.fetchContactSuccessed({ payload: result }))
    )
  );

  removeContactRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactManagerActions.removeContactRequested),
      switchMap(({ payload }) => forkJoin([this.contactService.delete(payload.id), of(payload)])),
      map(([result, contact]) => ContactManagerActions.removeContactSuccessed({ payload: contact }))
    )
  );

  constructor(private readonly actions$: Actions, private contactService: ContactService) { }
}

