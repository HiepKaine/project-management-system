import { Component } from '@angular/core';

import { NotificationType } from '../../notification.const';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'handle-click-notification',
  template: `
    <button (click)="show('Success data')">Success</button>
    <button (click)="show('Info data')">Info</button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class HandleClickNotificationComponent {
  constructor(private notification: NotificationService) { }

  show(data: string): void {
    const ref = this.notification.create(
      NotificationType.INFO,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzData: data }
    );
    ref.onClick.subscribe((e) => {
      console.log(e);
      alert((ref as any).options.nzData);
    })
  }
}
