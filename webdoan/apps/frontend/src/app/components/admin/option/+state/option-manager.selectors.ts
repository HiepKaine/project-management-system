import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  OPTION_MANAGER_FEATURE_KEY,
  State,
} from './option-manager.reducer';

export const getOptionManagerState = createFeatureSelector<State>(
  OPTION_MANAGER_FEATURE_KEY
);


export const getOptionList = createSelector(
  getOptionManagerState,
  (state: State) => state.list
);

