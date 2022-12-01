import { Component } from '@angular/core';

import { sidebarStateLocalStorageKey } from '../../../const';
import { SidebarState } from '../../../types';

@Component({
  selector: 'app-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout [withScroll]="false">
      <nb-layout-header fixed>
        <app-header></app-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" [state]="state" [containerFixed]="true">
        <div class="menu_center">
          <ng-content select="nb-menu"></ng-content>
        </div>
      </nb-sidebar>
      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  public state: SidebarState = localStorage.getItem(sidebarStateLocalStorageKey) as SidebarState | null ?? 'expanded';
}
