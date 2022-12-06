import { ApiPaginateResponse } from '@frontend/common';
import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import { Contact } from '../../../../models/contact.model';
import * as ContactManagerActions from './contact-manager.actions';

export const CONTACT_MANAGER_FEATURE_KEY = 'contactManager';

export interface State {
  list?: ApiPaginateResponse<Contact>
}

export const initialState: State = {};

const contactManagerReducer = createReducer(
  initialState,
  on(ContactManagerActions.fetchContactSuccessed, (state, { payload }) => ({
    ...state,
    ...{ list: payload }
  })),
  on(ContactManagerActions.removeContactSuccessed, (state, { payload }) => {
    if (state.list && state.list.data && Array.isArray(state.list.data)) {
      const items = state.list.data.map(item => {
        if (item.id === payload.id) {
          return { ...item, ...{ deletedAt: new Date() } }
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
  return contactManagerReducer(state, action);
}
