import { ApiPaginateResponse } from '@frontend/common';
import { Contact } from '@frontend/models/contact.model';
import {
  createAction,
  props,
} from '@ngrx/store';

export const removeContactRequested = createAction(
  '[ContactManager/API] remove contact requested',
  props<{ payload: Contact }>()
);

export const removeContactSuccessed = createAction(
  '[ContactManager/API] remove contact successed',
  props<{ payload: Contact }>()
);

export const fetchContactRequested = createAction(
  '[ContactManager/API] fetch contact requested',
  props<{ payload?: { keyword?: string, page?: number } }>()
);

export const fetchContactSuccessed = createAction(
  '[ContactManager/API] fetch contact successed',
  props<{ payload: ApiPaginateResponse<Contact> }>()
);
