import { Component } from '@angular/core';

@Component({
  selector: 'app-full-width-notify-layout',
  styleUrls: ['./full-width.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <app-header [authenticated]="authenticated"></app-header>
      </nb-layout-header>

      <nb-layout-column class="full-width">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

    </nb-layout>
  `
})
export class FullWithNotifyLayoutComponent {
  public authenticated = true;
}
