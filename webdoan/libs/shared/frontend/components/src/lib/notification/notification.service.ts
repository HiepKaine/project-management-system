import { Injectable } from '@angular/core';

import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends NzNotificationService {
  public SUCCESS = 'success';

}
