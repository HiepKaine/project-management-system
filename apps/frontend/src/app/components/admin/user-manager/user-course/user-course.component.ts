import { Component, ViewContainerRef } from '@angular/core';
import { Dictionary } from '@frontend/models/dictionary.model';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { pageParser } from './../../../../@core/utils/query-parser';
import { AddUserCourseModalComponent } from '../add-user-course-modal/add-user-course-modal.component';

import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApiItemResponse, ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import {
  UntilDestroy,
  untilDestroyed
} from '@ngneat/until-destroy';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@frontend/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { UserService } from '../user.service';
@UntilDestroy()
@Component({
  selector: 'app-user-course',
  templateUrl: './user-course.component.html',
  styleUrls: ['./user-course.component.scss'],
})
export class UserCourseComponent {
  public userId!: number;
  public user!: User;
  public courses: Course[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;

  constructor(
    private modal: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.activatedRoute.params
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        tap(({ id }) => {
          this.userId = Number(id);
        }),
        switchMap(({ id }) => this.userService.show(id))
      )
      .subscribe((result: ApiItemResponse<User>) => {
        this.user = plainToInstance(User, result.data);
      })

    this.activatedRoute.queryParams
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged()
      )
      .subscribe(({ page }) => {
        page = pageParser(page);
        this.getUserCourse({ page });
      })

  }

  private getUserCourse(param: { page: number }) {
    this.userService.getUserCourse(this.userId, param).subscribe((result: ApiPaginateResponse<Course>) => {
      this.courses = result.data.map(item => plainToInstance(Course, item));
      this.pagination = result.meta.pagination;
    })
  }


  deleteUserCourse(item: Course) {
    this.modal.warning({
      nzTitle: 'Xoá khoá học của học viên',
      nzContent: `Bạn đang xoá khoá học ${item.name}`,
      nzOnOk: () => {
        this.userService.removeUserCourse(this.userId, item.id).subscribe(() => {
          const page = pageParser(this.activatedRoute.snapshot.queryParams['page']);
          this.getUserCourse({ page });
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 });
        })
      }
    });
  }


  gotoPage(page: number) {
    this.router.navigate([], { queryParams: { page }, relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }

  openAddCourseModal(): void {
    const modal = this.modal.create({
      nzTitle: `Thêm khoá học cho ${this.user.getFullName()}`,
      nzContent: AddUserCourseModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzWidth: 800,
      nzOnOk: () => {
        const course = modal.getContentComponent().selectedCourse;
        this.userService.addUserCourse(this.userId, course.id).subscribe(() => {
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.update'), { nzDuration: 3000 });
          this.getUserCourse({ page: 1 });
          modal.destroy();
        })
      },
    });
  }
}
