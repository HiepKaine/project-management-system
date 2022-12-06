import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  CONTACT_MANAGER_FEATURE_KEY,
  State,
} from './contact-manager.reducer';

export const getContactManagerState = createFeatureSelector<State>(
  CONTACT_MANAGER_FEATURE_KEY
);


export const getContactList = createSelector(
  getContactManagerState,
  (state: State) => state.list
);

