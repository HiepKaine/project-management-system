import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  FAQ_MANAGER_FEATURE_KEY,
  State,
} from './faq-manager.reducer';

export const getFaqManagerState = createFeatureSelector<State>(
  FAQ_MANAGER_FEATURE_KEY
);


export const getFaqList = createSelector(
  getFaqManagerState,
  (state: State) => state.list
);

