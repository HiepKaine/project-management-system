import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Classes } from '@frontend/models/class.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClassService } from '../class.service';
import { CreateClassModalComponent } from '../create-class-modal/create-class-modal.component';
import { EditClassModalComponent } from '../edit-class-modal/edit-class-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public classes: Classes[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;
  constructor(
    private classService: ClassService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private ngxFormManager: NgxFormManager,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private viewcontainerRef: ViewContainerRef
  ) {
    this.activatedRoute.queryParams.subscribe(({ keyword, page }) => {
      const param: { keyword?: string; page?: number } = {
        page: pageParser(page),
      };
      if (keyword) {
        this.keyword = keyword;
        param.keyword = keyword;
      }
      this.getClass(param);
    });
  }

  getClass(param?: { keyword?: string; page?: number }): void {
    this.classService
      .get(param)
      .subscribe((result: ApiPaginateResponse<Classes>) => {
        this.classes = plainToInstance(Classes, result.data);
        console.log(this.classes);
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

  createClassModal(){
    const modal = this.modal.create({
      nzTitle: 'Thêm lớp học',
      nzContent: CreateClassModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            classCode: form.get('classCode')?.value,
          };
          this.classService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getClass()
          });
        }
        return false;
      },
    })
  }

  editClassModal(item: Classes): void {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật lớp học',
      nzContent: EditClassModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        class: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            classCode: form.get('classCode')?.value,
          };
          this.classService.update(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getClass()
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Classes) {
    this.modal.warning({
      nzTitle: 'Xóa lớp',
      nzContent: `Bạn có chắc chắn muốn xóa lớp <b>${item.name}</b> không?`,
      nzOnOk: () => {
        this.classService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
        this.getClass()
      },
    });
  }
}
