import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { RegisterRequest } from 'apps/frontend/src/app/components/auth/auth.type';
import { State } from './shell.reducer';

export const init = createAction('[Shell] init', props<{ payload: State }>());

export const loginRequested = createAction(
  '[Shell] login requested',
  props<{ payload: { user: string; password: string }; isAdmin?: boolean }>()
);
export const loginSuccessed = createAction(
  '[Shell] login successed',
  props<{ payload: { token: string }; isAdmin?: boolean }>()
);
export const logoutRequested = createAction('[Shell] logout requested');
export const logoutSuccessed = createAction('[Shell] logout successed');
export const registerRequested = createAction(
  '[Shell] register requested',
  props<{ payload: RegisterRequest }>()
);
export const registerSuccessed = createAction(
  '[Shell] register successed',
  props<{ payload: { token: string } }>()
);
export const AppError = createAction(
  '[Shell] Error',
  props<{ error: HttpErrorResponse }>()
);
