import { HttpErrorResponse } from '@angular/common/http';

import { Dictionary } from '@frontend/models/dictionary.model';
import {
  createAction,
  props,
} from '@ngrx/store';

import { RegisterRequest } from '../../components/auth/auth.type';
import { User } from '../../models/user.model';
import { State } from './shell.reducer';

export const init = createAction('[Shell] init', props<{ payload: State }>());

export const fetchDictionaryRequested = createAction('[Shell] fetch dictionary requested');
export const fetchDictionarySuccessed = createAction('[Shell] fetch dictionary successed', props<{ payload: Dictionary }>());

export const fetchProfileRequested = createAction('[Shell] fetch profile requested');
export const fetchProfileSuccessed = createAction('[Shell] fetch profile successed', props<{ payload: User }>());
export const fetchProfileFailed = createAction('[Shell] fetch profile failed', props<{ payload: Error }>());
export const loginRequested = createAction('[Shell] login requested', props<{ payload: { user: string, password: string }, isAdmin?: boolean }>());
export const loginSuccessed = createAction('[Shell] login successed', props<{ payload: { token: string }, isAdmin?: boolean }>());
export const logoutRequested = createAction('[Shell] logout requested');
export const logoutSuccessed = createAction('[Shell] logout successed');
export const registerRequested = createAction('[Shell] register requested', props<{ payload: RegisterRequest }>());
export const registerSuccessed = createAction('[Shell] register successed', props<{ payload: { token: string } }>());
export const AppError = createAction('[Shell] Error', props<{ error: HttpErrorResponse }>());



