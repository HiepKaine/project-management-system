import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponsePagination,
} from '@frontend/common';
import { UserActivity } from '@frontend/models/user-activity.model';
import { User } from '@frontend/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UserService } from '../user.service';

@UntilDestroy()
@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.scss'],
})
export class UserActivityComponent {
  public userActivitys: UserActivity[] = [];
  public userId!: number;
  public user!: User;
  public keyword!: string;
  public pagination!: ApiResponsePagination;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userSerive: UserService,
    private router: Router
  ) {
    this.activatedRoute.params
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap(({ id }) => {
          this.userId = Number(id);
        }),
        switchMap(({ id }) => this.userSerive.show(id))
      )
      .subscribe((result: ApiItemResponse<User>) => {
        this.user = plainToInstance(User, result.data);
      });

    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(({ page }) => {
        const param: {page?: number } = {
          page: pageParser(page),
        };

        this.getUserActivity(param);
      });
  }

  private getUserActivity(param?: { page?: number }) {
    this.userSerive
      .getUserActivity(this.userId, param)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiPaginateResponse<UserActivity>) => {
        this.userActivitys = plainToInstance(UserActivity, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  gotoPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }
}
