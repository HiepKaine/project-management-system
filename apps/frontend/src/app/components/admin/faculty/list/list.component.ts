import { Component, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Faculty } from '@frontend/models/faculty.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateFacultyModalComponent } from '../create-faculty-modal/create-faculty-modal.component';
import { EditComponent } from '../edit/edit.component';
import { FacultyService } from '../faculty.service';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public facultys: Faculty[] = [];
  public pagination!: ApiResponsePagination;
  constructor(
    private modal: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facultyService: FacultyService,
    private ngxFormManager: NgxFormManager,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private viewcontainerRef: ViewContainerRef
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe(({ keyword, page }) => {
        const param: { keyword?: string; page?: number } = {
          page: pageParser(page),
        };
        if (keyword) {
          this.keyword = keyword;
          param.keyword = keyword;
        }
        this.getFaculty(param);
      });
  }

  private getFaculty(param?: { keyword?: string; page?: number }) {
    this.facultyService
      .get(param)
      .subscribe((result: ApiPaginateResponse<Faculty>) => {
        this.facultys = plainToInstance(Faculty, result.data);
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

  createFacultyModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm khoa',
      nzContent: CreateFacultyModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            facultyCode: form.get('facultyCode')?.value,
          };
          this.facultyService.create(data).subscribe(() => {
            console.log(data);
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  editFacultyModal(item: Faculty): void {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật khoa',
      nzContent: EditComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        faculty: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            facultyCode: form.get('facultyCode')?.value,
          };
          this.facultyService.update(item.id, data).subscribe(() => {
            console.log(data);
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Faculty) {
    this.modal.warning({
      nzTitle: 'Xóa khoa',
      nzContent: `Bạn có chắc chắn muốn xóa khoa <b>${item.name}</b> không?`,
      nzOnOk: () => {
        this.facultyService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
      },
    });
  }
}
