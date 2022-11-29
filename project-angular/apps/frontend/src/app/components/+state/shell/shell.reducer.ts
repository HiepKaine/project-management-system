import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import * as ShellActions from './shell.actions';

export const SHELL_FEATURE_KEY = 'shell';

export interface State {
  loggedIn: boolean;
  loaded: boolean;
  error?: string | null;
}

export interface ShellPartialState {
  readonly [SHELL_FEATURE_KEY]: State;
}

export const initialState: State = {
  loggedIn: false,
  loaded: false,
};

const shellReducer = createReducer(
  initialState,
  on(ShellActions.init, (state, { payload }) => payload),
  on(ShellActions.loginRequested, () => initialState),
  on(ShellActions.logoutSuccessed, () => initialState),
);

export function reducer(state: State | undefined, action: Action) {
  return shellReducer(state, action);
}
