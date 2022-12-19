import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Attendance } from '@frontend/models/attendance.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AttendanceService } from '../attendance.service';
import { CreateAttendanceModalComponent } from '../create-attendance-modal/create-attendance-modal.component';
import { EditAttendanceModalComponent } from '../edit-attendance-modal/edit-attendance-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.scss'],
})
export class ListAttendanceComponent {
  public attendances: Attendance[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;

  constructor(
    private attendanceService: AttendanceService,
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
        this.getAttendance({ page, keyword });
      });
  }

  getAttendance(param?: { page?: number; keyword?: string }) {
    this.attendanceService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Attendance>) => {
        this.attendances = plainToInstance(Attendance, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  createAttendanceModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm điểm danh mới',
      nzContent: CreateAttendanceModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            studentId: form.get('studentId')?.value,
            subjectId: form.get('subjectId')?.value,
            totalAbsences: form.get('totalAbsences')?.value,
          };

          this.attendanceService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getAttendance();
          });
        }
        return false;
      },
    });
  }

  editAttendanceModal(item: Attendance) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật điểm danh',
      nzContent: EditAttendanceModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        attendance: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            studentId: form.get('studentId')?.value,
            subjectId: form.get('subjectId')?.value,
            totalAbsences: form.get('totalAbsences')?.value,
          };

          this.attendanceService.update(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );

            modal.destroy();
            this.getAttendance();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Attendance) {
    this.modal.warning({
      nzTitle: 'Xóa bộ môn',
      nzContent: `Bạn có chắc chắn muốn xóa <b>${item.studentId}</b> không?`,
      nzOnOk: () => {
        this.attendanceService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
        this.getAttendance();
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
