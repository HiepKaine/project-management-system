import {
  ErrorHandler,
  Injectable,
} from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '@frontend/env/environment';
import * as Sentry from '@sentry/angular';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';

@Injectable()
export class ExceptionHandler implements ErrorHandler {
  constructor(private notificationService: NotificationService, private router: Router,) { }
  handleError(error: any) {
    if (!environment.production) {
      console.error(error);
    }
    if (error?.error?.message) {
      if (error.error.message == 'Unauthorized') {
        localStorage.removeItem(environment.tokenKey);
        this.router.navigate(['/', 'auth', 'login']);
      } else {
        this.notificationService.error('Đã có lỗi xảy ra', error.error.message, { nzDuration: 5000 });
      }

    }
    Sentry.captureException(error);
  }
}
