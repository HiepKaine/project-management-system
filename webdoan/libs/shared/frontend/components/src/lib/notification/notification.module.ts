import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule,
    NzNotificationModule,
  ],
  providers: [NotificationService],
})
export class NotificationModule { }
