import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import {
  SHELL_FEATURE_KEY,
  State,
} from './shell.reducer';

export const getShellState = createFeatureSelector<State>(SHELL_FEATURE_KEY);

export const getShellLoaded = createSelector(
  getShellState,
  (state: State) => state.loaded
);

export const getShellLoggedIn = createSelector(
  getShellState,
  (state: State) => state.loggedIn
);

export const getShellProfile = createSelector(
  getShellState,
  (state: State) => state.profile
);

export const getShellError = createSelector(
  getShellState,
  (state: State) => state.error
);

export const updateShellProfile = createSelector(
  getShellState,
  (state: State) => state.profile
);

export const getDictionary = createSelector(
  getShellState,
  (state: State) => state.dictionary
);


