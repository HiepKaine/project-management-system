import { Component } from '@angular/core';

import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';

import * as ShellActions from '@frontend/shell/shell.actions';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { NbMenuItem } from '@nebular/theme';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';

import { User } from '../../models/user.model';
import { MENU_ITEMS } from './app-menu';

@UntilDestroy()
@Component({
  selector: 'app-main',
  template: `
    <app-one-column-layout>
      <nb-menu *ngIf="menu" [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public menu!: NbMenuItem[];
  public profile!: User;
  constructor(private store: Store) {
    this.store.dispatch(ShellActions.fetchDictionaryRequested());
    this.store
      .pipe(
        select(ShellSelectors.getShellProfile),
        filter((data) => data !== undefined),
        untilDestroyed(this)
      )
      .subscribe((data) => {
        this.profile = plainToInstance(User, data);
        if (this.profile.isAdmin()) {
          this.menu = MENU_ITEMS;
        }
      });
  }
}
