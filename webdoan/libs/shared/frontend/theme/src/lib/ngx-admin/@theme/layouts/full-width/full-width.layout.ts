import { Component } from '@angular/core';

@Component({
  selector: 'app-full-width-layout',
  styleUrls: ['./full-width.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed *ngIf="authenticated">
        <app-header [authenticated]="authenticated"></app-header>
      </nb-layout-header>

      <nb-layout-column class="full-width">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

    </nb-layout>
  `
})
export class FullWithLayoutComponent {
  public authenticated = false;
}
