import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DashBoardService } from '../dashboard.service';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationExtras,
  Router,
} from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { filter } from 'rxjs';
import { User } from '@frontend/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-user-exam',
  templateUrl: './user-exam.component.html',
  styleUrls: ['./user-exam.component.scss'],
})
export class UserExamComponent implements OnInit {
  public keyword!: string;
  public examPacks: ExamPack[] = [];
  public profile!: User;
  public pagination!: ApiResponsePagination;

  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private dashboardService: DashBoardService
  ) {
    this.store
      .pipe(
        select(ShellSelectors.getShellProfile),
        filter((data) => data !== undefined),
        untilDestroyed(this)
      )
      .subscribe((data) => {
        this.profile = plainToInstance(User, data);
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.dashboardService
          .getMyExamPack()
          .subscribe((result: ApiPaginateResponse<ExamPack>) => {
            this.examPacks = result.data.map((item) =>
              plainToInstance(ExamPack, item)
            );
            this.pagination = result.meta.pagination;
          });
      });
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page } };
    this.router.navigate(['/', 'dashboard', 'exam'], params);
  }
  ngOnInit(): void {}
}
