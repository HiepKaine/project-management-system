import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Subject } from '@frontend/models/subject.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateSubjectModalComponent } from '../create-subject-modal/create-subject-modal.component';
import { EditSubjectModalComponent } from '../edit-subject-modal/edit-subject-modal.component';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-list-subject',
  templateUrl: './list-subject.component.html',
  styleUrls: ['./list-subject.component.scss'],
})
@UntilDestroy()
export class ListSubjectComponent {
  public subjects: Subject[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;

  constructor(
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private router: Router,
    private viewcontainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private subjectService: SubjectService
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const keyword = data['keyword'] ?? '';
        this.getSubject({ page, keyword });
      });
  }

  getSubject(param?: { page?: number; keyword?: string }) {
    this.subjectService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Subject>) => {
        this.subjects = plainToInstance(Subject, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  createSubjectModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm môn mới',
      nzContent: CreateSubjectModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            subjectCode: form.get('subjectCode')?.value,
          };

          this.subjectService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getSubject();
          });
        }
        return false;
      },
    });
  }

  editSubjectModal(item: Subject) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật môn',
      nzContent: EditSubjectModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        subject: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            name: form.get('name')?.value,
            subjectCode: form.get('subjectCode')?.value,
          };

          this.subjectService.update(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getSubject();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Subject) {
    this.modal.warning({
      nzTitle: 'Xóa bộ môn',
      nzContent: `Bạn có chắc chắn muốn xóa môn <b>${item.name}</b> không?`,
      nzOnOk: () => {
        this.subjectService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
        this.getSubject();
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
