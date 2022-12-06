import { Component } from '@angular/core';
import {
  NavigationEnd,
  NavigationExtras,
  Router
} from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';
import { CourseService } from './course.service';

@UntilDestroy()
@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.scss'],
})
export class UserCourseComponent {
  public keyword!: string;
  public courses: Course[] = [];
  public profile!: User;
  public pagination!: ApiResponsePagination;

  constructor(
    private router: Router,
    private store: Store,
    private courseService: CourseService
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
        this.courseService
          .getMyCourse()
          .subscribe((result: ApiPaginateResponse<Course>) => {
            this.courses = result.data.map((item) =>
              plainToInstance(Course, item)
            );
            this.pagination = result.meta.pagination;
          });
      });
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page } };
    this.router.navigate(['/', 'dashboard', 'course'], params);
  }
}
