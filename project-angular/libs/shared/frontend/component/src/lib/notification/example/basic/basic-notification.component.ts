import {
  Component,
  Input,
} from '@angular/core';

import { NotificationService } from '../../notification.service';

@Component({
  selector: 'basic-notification',
  template: `
    <button (click)="createNotification('success')">Success</button>
    <button (click)="createNotification('info')">Info</button>
    <button (click)="createNotification('warning')">Warning</button>
    <button (click)="createNotification('error')">Error</button>
  `,
  styles: [
    `
      button {
        margin-right: 1em;
      }
    `
  ]
})
export class BasicNotificationComponent {
  @Input() title!: string;
  @Input() content!: string;
  constructor(private notification: NotificationService) { }
  createNotification(type: string): void {
    this.notification.create(
      type,
      this.title,
      this.content
    );
  }
}
