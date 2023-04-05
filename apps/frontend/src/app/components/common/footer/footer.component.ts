import { Component } from '@angular/core';
import * as ShellActions from '@frontend/shell/shell.actions';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
@UntilDestroy()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private store: Store) {
  }

  logout() {
    this.store.dispatch(ShellActions.logoutRequested());
  }
}
