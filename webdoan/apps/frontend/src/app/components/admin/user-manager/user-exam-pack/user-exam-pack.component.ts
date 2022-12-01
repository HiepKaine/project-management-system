import { Component, ViewContainerRef } from '@angular/core';
import { Dictionary } from '@frontend/models/dictionary.model';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { pageParser } from './../../../../@core/utils/query-parser';

import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApiItemResponse, ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import {
  UntilDestroy,
  untilDestroyed
} from '@ngneat/until-destroy';

import { ActivatedRoute, Router } from '@angular/router';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { User } from '@frontend/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { AddUserExamPackModalComponent } from '../add-user-exam-pack-modal/add-user-exam-pack-modal.component';
import { UserService } from '../user.service';
@UntilDestroy()
@Component({
  selector: 'app-user-exam-pack',
  templateUrl: './user-exam-pack.component.html',
  styleUrls: ['./user-exam-pack.component.scss'],
})
export class UserExamPackComponent {
  public userId!: number;
  public user!: User;
  public examPacks: ExamPack[] = [];
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
        this.getUserExamPack({ page });
      })

  }

  private getUserExamPack(param: { page: number }) {
    this.userService.getUserExamPack(this.userId, param).subscribe((result: ApiPaginateResponse<ExamPack>) => {
      this.examPacks = result.data.map(item => plainToInstance(ExamPack, item));
      this.pagination = result.meta.pagination;
    })
  }


  deleteUserExamPack(item: ExamPack) {
    this.modal.warning({
      nzTitle: 'Xoá gói trắc nghiệm của học viên',
      nzContent: `Bạn đang xoá gói trắc nghiệm ${item.name}`,
      nzOnOk: () => {
        this.userService.removeExamPack(this.userId, item.id).subscribe(() => {
          const page = pageParser(this.activatedRoute.snapshot.queryParams['page']);
          this.getUserExamPack({ page });
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 });
        })
      }
    });
  }


  gotoPage(page: number) {
    this.router.navigate([], { queryParams: { page }, relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }

  openAddExamPackModal(): void {
    const modal = this.modal.create({
      nzTitle: `Thêm gói trắc nghiệm cho ${this.user.getFullName()}`,
      nzContent: AddUserExamPackModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzWidth: 800,
      nzOnOk: () => {
        const item = modal.getContentComponent().selected;
        this.userService.addUserExamPack(this.userId, item.id).subscribe(() => {
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.update'), { nzDuration: 3000 });
          this.getUserExamPack({ page: 1 });
          modal.destroy();
        })
      },
    });
  }
}
