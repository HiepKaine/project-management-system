import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { environment } from '@frontend/env/environment';
import * as ShellActions from '@frontend/shell/shell.actions';
import {
  Store
} from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  NotificationService
} from '@shared/components/notification/notification.service';
import {
  Observable
} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthOrGuestGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private notificationService: NotificationService, private translate: TranslateService) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem(environment.tokenKey) ?? localStorage.getItem(environment.tokenKey);
    if (token === null) {
      this.store.dispatch(ShellActions.init({ payload: { loggedIn: false, loaded: true } }));
      return true;
    } else {
      this.store.dispatch(ShellActions.init({ payload: { loggedIn: true, loaded: true } }));
      this.store.dispatch(ShellActions.fetchProfileRequested());
      return true;
    }

  }

}
