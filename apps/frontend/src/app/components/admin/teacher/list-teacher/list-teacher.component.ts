import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Teacher } from '@frontend/models/teacher.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateTeacherModalComponent } from '../create-teacher-modal/create-teacher-modal.component';
import { EditTeacherModalComponent } from '../edit-teacher-modal/edit-teacher-modal.component';
import { TeacherService } from '../teacher.service';

@UntilDestroy()
@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss'],
})
export class ListTeacherComponent {
  public teachers: Teacher[] = [];
  public pagination!: ApiResponsePagination;
  public keyword!: string;

  constructor(
    private teacherService: TeacherService,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private viewcontainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager,
    private router: Router
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const keyword = data['keyword'] ?? '';
        this.getTeachers({ page, keyword });
      });
  }

  getTeachers(param?: { page: number; keyword: string }) {
    this.teacherService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Teacher>) => {
        this.teachers = plainToInstance(Teacher, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  createTeacherModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm giảng viên',
      nzContent: CreateTeacherModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            image: imageUrl,
            name: form.get('name')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
            address: form.get('address')?.value,
            sex: form.get('sex')?.value,
            level: form.get('level')?.value,
            email: form.get('email')?.value,
            nationality: form.get('nationality')?.value,
            divisionId: form.get('divisionId')?.value,
            facultyId: form.get('facultyId')?.value,
          };
          this.teacherService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getTeachers();
          });
        }
        return false;
      },
    });
  }

  editTeacherModal(teacher: Teacher) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật giảng viên',
      nzContent: EditTeacherModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        teacher: teacher,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            image: form.get('image')?.value[0]?.url ?? null,
            name: form.get('name')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
            address: form.get('address')?.value,
            sex: form.get('sex')?.value,
            level: form.get('level')?.value,
            email: form.get('email')?.value,
            nationality: form.get('nationality')?.value,
            divisionId: form.get('divisionId')?.value,
            facultyId: form.get('facultyId')?.value,
            teacherCode: teacher.teacherCode,
          };
          this.teacherService.update(teacher.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getTeachers();
          });
        }
        return false;
      },
    });
  }

  deleteItem(item: Teacher) {
    this.modal.warning({
      nzTitle: 'Xóa giảng viên',
      nzContent: `Bạn có chắc chắn muốn xóa giảng viên <b>${item.name}</b> không ?`,
      nzOnOk: () => {
        this.teacherService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
          this.getTeachers();
        });
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
      relativeTo: this.activatedRoute,
      queryParams: {
        page: page,
      },
      queryParamsHandling: 'merge',
    });
  }
}
