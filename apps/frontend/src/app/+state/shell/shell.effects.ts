import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  EMPTY,
  map,
  mergeMap,
  of,
  switchMap,
  tap
} from 'rxjs';

import { ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';
import {
  NotificationService
} from '@shared/components/notification/notification.service';

import { ApiService } from '../../@api/api.service';
import { AuthService } from '../../components/auth/auth.service';
import { LoginResponse } from '../../components/auth/auth.type';
import * as ShellActions from './shell.actions';

@Injectable()
export class ShellEffects {

  fetchProfileRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.fetchProfileRequested),
      switchMap(() =>
        this.apiService.profile().pipe(
          map((data) => ShellActions.fetchProfileSuccessed({ payload: data })),
          catchError((error) => of(ShellActions.fetchProfileFailed({ payload: error })))
        )
      )
    )
  );

  fetchProfileFailed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.fetchProfileFailed),
      map(() => ShellActions.logoutRequested())
    )
  );

  loginRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.loginRequested),
      mergeMap(({ payload, isAdmin }) =>
        this.authService.login(payload).pipe(
          map((result: ApiItemResponse<LoginResponse>) => ShellActions.loginSuccessed({ payload: { token: result.data.token }, isAdmin: isAdmin }))
        )
      )
    )
  );

  loginSuccessed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.loginSuccessed),
      tap(({ payload, isAdmin }) => {
        this.notificationService.success(
          'Thông báo',
          'Bạn đã đăng nhập thành công!',
          { nzDuration: 1000 }
        );
        localStorage.setItem(environment.tokenKey, payload.token);
        if (isAdmin) {
          this.router.navigate(['/', 'admin']);
        } else {
          this.router.navigate(['/']);
        }
      }),
    ), { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.registerRequested),
      mergeMap(({ payload }) =>
        this.authService.register(payload).pipe(
          map((result: ApiItemResponse<LoginResponse>) => {
            return ShellActions.loginSuccessed({ payload: result.data, isAdmin: false });
          }),
          catchError((error) => {
            this.notificationService.error(
              'Thông báo!',
              `${error.error.message}! Vui lòng nhập lại`,
              { nzDuration: 3000 }
            );
            throw EMPTY;
          })
        )
      )
    )
  );

  logoutRequested$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.logoutRequested),
      tap(() => {
        localStorage.removeItem(environment.tokenKey);
        sessionStorage.removeItem(environment.tokenKey);
      }),
      map(() => ShellActions.logoutSuccessed())
    )
  );

  logoutSuccessed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShellActions.logoutSuccessed),
      tap(() => {
        if (document?.location?.href.includes('admin')) {
          this.router.navigate(['/', 'auth', 'login'], { queryParams: { type: 'admin' } });
        } else {
          this.router.navigate(['/', 'auth', 'login']);
        }
      })
    ), { dispatch: false }
  );


  constructor(
    private readonly actions$: Actions,
    private apiService: ApiService,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }
}
