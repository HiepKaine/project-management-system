import { Component } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Option } from '@frontend/models/option.model';

import * as OptionManagerActions from '../+state/option-manager.actions';
import * as OptionManagerSelectors from '../+state/option-manager.selectors';


@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public options: Option[] = [];
  public pagination!: ApiResponsePagination;

  constructor(
    private router: Router,
    private store: Store,
  ) {
    this.store
      .select(OptionManagerSelectors.getOptionList)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiPaginateResponse<Option> | undefined) => {
        if (result && Array.isArray(result.data)) {
          this.options = result.data.map((item) => plainToInstance(Option, item));
          this.pagination = result.meta.pagination;
        }
      });
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.store.dispatch(OptionManagerActions.fetchOptionRequested({}));
      });
  }
}
