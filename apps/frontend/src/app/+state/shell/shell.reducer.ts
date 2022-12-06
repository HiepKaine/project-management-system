import { Dictionary } from '@frontend/models/dictionary.model';
import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';

import { User } from '../../models/user.model';
import * as ShellActions from './shell.actions';

export const SHELL_FEATURE_KEY = 'shell';

export interface State {
  loggedIn: boolean;
  loaded: boolean;
  profile?: User;
  dictionary?: Dictionary;
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
  on(ShellActions.fetchProfileSuccessed, (state, { payload }) => ({ ...state, ...{ loggedIn: true, profile: payload, loaded: true } })),
  on(ShellActions.fetchProfileFailed, (state) => ({ ...state, ...{ profile: undefined, loaded: false, loggedIn: false } })),
  on(ShellActions.fetchDictionarySuccessed, (state, { payload }) => ({ ...state, ...{ dictionary: payload } })),
);

export function reducer(state: State | undefined, action: Action) {
  return shellReducer(state, action);
}
