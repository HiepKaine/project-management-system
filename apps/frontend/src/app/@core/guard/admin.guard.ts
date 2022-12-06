import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';

import { plainToInstance } from 'class-transformer';
import {
  filter,
  map,
  Observable,
} from 'rxjs';

import { environment } from '@frontend/env/environment';
import { User } from '@frontend/models/user.model';
import * as ShellActions from '@frontend/shell/shell.actions';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import {
  select,
  Store,
} from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private notificationService: NotificationService, private translate: TranslateService) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = sessionStorage.getItem(environment.tokenKey) ?? localStorage.getItem(environment.tokenKey);
    const redirectToLoginPage = () => {
      this.router.navigate(['/', 'auth', 'login'], { queryParams: { type: 'admin' } });
    }
    if (token === null) {
      redirectToLoginPage();
      return false;
    } else {
      this.store.dispatch(ShellActions.fetchProfileRequested());
      return this.store.pipe(
        select(ShellSelectors.getShellProfile),
        filter((data: User | undefined) => data !== undefined),
        map((data: User | undefined) => {
          const profile = plainToInstance(User, data);
          if (profile.isAdmin()) {
            return true;
          } else {
            this.notificationService.error(this.translate.instant('error.title'), this.translate.instant('permission.deny'), { nzDuration: 3000 });
            localStorage.removeItem(environment.tokenKey);
            redirectToLoginPage();
            return false;
          }
        })
      );
    }

  }

}
