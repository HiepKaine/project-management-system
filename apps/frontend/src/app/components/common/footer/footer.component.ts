import { Component } from '@angular/core';
import * as ShellActions from '@frontend/shell/shell.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { Dictionary } from '@frontend/models/dictionary.model';
import { Option } from '@frontend/models/option.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { plainToInstance } from 'class-transformer';

@UntilDestroy()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public options: Option[] = [];
  public dictionary!: Dictionary;

  constructor(private store: Store) {
    this.store.dispatch(ShellActions.fetchDictionaryRequested());
    this.store
      .select(ShellSelectors.getDictionary)
      .pipe(untilDestroyed(this))
      .subscribe((dictionary: Dictionary | undefined) => {
        if (dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          this.options = dictionary.option;
        }
      });
  }

  logout() {
    this.store.dispatch(ShellActions.logoutRequested());
  }
}
