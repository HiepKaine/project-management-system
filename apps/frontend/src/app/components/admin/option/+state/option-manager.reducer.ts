import { ApiPaginateResponse } from '@frontend/common';
import { Action, createReducer, on } from '@ngrx/store';

import { Option } from '@frontend/models/option.model';
import * as OptionManagerActions from './option-manager.actions';

export const OPTION_MANAGER_FEATURE_KEY = 'optionManager';

export interface State {
  list?: ApiPaginateResponse<Option>;
}

export const initialState: State = {};

const optionManagerReducer = createReducer(
  initialState,
  on(OptionManagerActions.fetchOptionSuccessed, (state, { payload }) => ({
    ...state,
    ...{ list: payload },
  })),
  on(OptionManagerActions.removeOptionSuccessed, (state, { payload }) => {
    if (state.list && state.list.data && Array.isArray(state.list.data)) {
      const items = state.list.data.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...{ deletedAt: new Date() } };
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
  return optionManagerReducer(state, action);
}
