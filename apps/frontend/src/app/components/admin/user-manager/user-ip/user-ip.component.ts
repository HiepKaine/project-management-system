import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponsePagination,
} from '@frontend/common';
import { Ip } from '@frontend/models/ip.model';
import { User } from '@frontend/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { UserService } from '../user.service';

@UntilDestroy()
@Component({
  selector: 'app-user-ip',
  templateUrl: './user-ip.component.html',
  styleUrls: ['./user-ip.component.scss'],
})
export class UserIpComponent {
  public userId!: number;
  public user!: User;
  public userIps: Ip[] = [];
  public pagination!: ApiResponsePagination;
  constructor(
    private modal: NzModalService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService
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
      });

    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(({ page }) => {
        page = pageParser(page);
        this.getUserIp({ page });
      });
  }

  private getUserIp(param?: { page?: number }) {
    this.userService
      .getUserIp(this.userId, param)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiPaginateResponse<Ip>) => {
        this.userIps = plainToInstance(Ip, result.data);
      });
  }

  deleteItem(item: Ip) {
    this.modal.warning({
      nzTitle: 'Xoá ip của học viên',
      nzContent: `Bạn đang xoá ip ${item.ip}`,
      nzOnOk: () => {
        this.userService.deleteUserIp(this.userId, item.id).subscribe(() => {
          const page = pageParser(
            this.activatedRoute.snapshot.queryParams['page']
          );
          this.getUserIp({ page });
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
      },
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
