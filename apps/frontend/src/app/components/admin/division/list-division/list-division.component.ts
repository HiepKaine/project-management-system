import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiResponsePagination, ApiPaginateResponse } from '@frontend/common';
import { Division } from '@frontend/models/division.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateDivisionModalComponent } from '../create-division-modal/create-division-modal.component';
import { DivisionService } from '../division.service';
import { EditDivisionModalComponent } from '../edit-division-modal/edit-division-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-list-division',
  templateUrl: './list-division.component.html',
  styleUrls: ['./list-division.component.scss'],
})
export class ListDivisionComponent {
  public divisions: Division[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;

  constructor(
    private divisionService: DivisionService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private viewcontainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const keyword = data['keyword'] ?? '';
        this.getDivision({ page, keyword });
      });
  }

  getDivision(param?: { page?: number; keyword?: string }) {
    this.divisionService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Division>) => {
        this.divisions = plainToInstance(Division, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  createDivisionModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm bộ môn mới',
      nzContent: CreateDivisionModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            divisionCode: form.get('divisionCode')?.value,
          };

          this.divisionService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getDivision();
          });
        }
        return false;
      },
    });
  }

  editDivisionModal(item: Division) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật bộ môn',
      nzContent: EditDivisionModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        division: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            divisionCode: form.get('divisionCode')?.value,
          };

          this.divisionService.update(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getDivision();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Division) {
    this.modal.warning({
      nzTitle: 'Xóa bộ môn',
      nzContent: `Bạn có chắc chắn muốn xóa bộ môn <b>${item.name}</b> không?`,
      nzOnOk: () => {
        this.divisionService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
        this.getDivision();
      },
    });
  }
  search() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        keyword: this.keyword ?? '',
        page: 1,
      },
      queryParamsHandling: 'merge',
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
