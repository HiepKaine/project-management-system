import { Component, ViewContainerRef } from '@angular/core';
import {
  ActivatedRoute, NavigationExtras,
  Router
} from '@angular/router';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponsePagination
} from '@frontend/common';
import { Option } from '@frontend/models/option.model';
import { User } from '@frontend/models/user.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { UserService } from '../user.service';
import { pageParser } from './../../../../@core/utils/query-parser';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public users: User[] = [];
  public keyword!: string;
  public option!: Option;
  public pagination!: ApiResponsePagination;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private userService: UserService,
    private translate: TranslateService,
    private modal: NzModalService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef
  ) {
    this.activatedRoute.queryParams.subscribe(({ keyword, page }) => {
      const param: { keyword?: string; page?: number } = {
        page: pageParser(page),
      };
      if (keyword) {
        this.keyword = keyword;
        param.keyword = keyword;
      }
      this.getUser(param);
    });
  }

  private getUser(param?: { keyword?: string; page?: number }) {
    this.userService
      .get(param)
      .subscribe((result: ApiPaginateResponse<User>) => {
        this.users = result.data.map((item) => plainToInstance(User, item));
        this.pagination = result.meta.pagination;
      });
  }

  search() {
    const params: NavigationExtras = {
      queryParams: { keyword: this.keyword, page: 1 },
      relativeTo: this.activatedRoute,
    };
    this.router.navigate([], params);
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page } };
    this.router.navigate(['/', 'admin', 'user'], params);
  }

  openCreateUserModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm học viên',
      nzContent: CreateUserModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            email: form.get('email')?.value,
            password: form.get('password')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
          };

          this.userService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            this.getUser();
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  deleteUser(user: User) {
    this.modal.warning({
      nzTitle: 'Xoá học viên',
      nzContent: `Bạn đang xoá học viên`,
      nzOnOk: () => {
        this.userService.delete(user.id).subscribe(() => {
          this.getUser();
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('Bạn đã xoá thành công'),
            { nzDuration: 3000 }
          );
        });
      },
    });
  }

  changeUserStatus(status: any, user: User) {
    this.userService
      .changeUserStatus(user.id, status)
      .subscribe((result: ApiItemResponse<User>) => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
  }
}
