import { ApiPaginateResponse } from '@frontend/common';
import { Faq } from '@frontend/models/faq.modal';
import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import * as FaqManagerActions from './faq-manager.actions';

export const FAQ_MANAGER_FEATURE_KEY = 'faqManager';

export interface State {
  list?: ApiPaginateResponse<Faq>
}

export const initialState: State = {};

const faqManagerReducer = createReducer(
  initialState,
  on(FaqManagerActions.fetchFaqSuccessed, (state, { payload }) => ({
    ...state,
    ...{ list: payload }
  })),
  on(FaqManagerActions.removeFaqSuccessed, (state, { payload }) => {
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
  return faqManagerReducer(state, action);
}
