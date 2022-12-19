import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Student } from '@frontend/models/student';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateStudentModalComponent } from '../create-student-modal/create-student-modal.component';
import { DetailStudentComponent } from '../detail-student/detail-student.component';
import { EditStudentModalComponent } from '../edit-student-modal/edit-student-modal.component';
import { StudentService } from '../student.service';

@UntilDestroy()
@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent {
  public students: Student[] = [];
  public keyword!: string;
  public pagination!: ApiResponsePagination;

  constructor(
    private studentService: StudentService,
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
      .subscribe((param: Params) => {
        const page = pageParser(param['page']);
        const keyword = param['keyword'] ?? '';
        this.getStudent({ page, keyword });
      });
  }

  private getStudent(param?: { page?: number; keyword?: string }) {
    this.studentService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Student>) => {
        this.students = plainToInstance(Student, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  search() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        keyword: this.keyword ?? '',
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

  createStudentModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm sinh viên mới',
      nzContent: CreateStudentModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            facultyId: form.get('facultyId')?.value,
            classId: form.get('classId')?.value,
            studentCode: form.get('studentCode')?.value,
            name: form.get('name')?.value,
            image: imageUrl,
            studentYear: form.get('studentYear')?.value,
            idCard: form.get('idCard')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
            sex: form.get('sex')?.value,
            date: form.get('date')?.value,
            address: form.get('address')?.value,
            ethnic: form.get('ethnic')?.value,
            religion: form.get('religion')?.value,
            fatherName: form.get('fatherName')?.value,
            fatherJob: form.get('fatherJob')?.value,
            fatherPhoneNumber: form.get('fatherPhoneNumber')?.value,
            motherName: form.get('motherName')?.value,
            motherJob: form.get('motherJob')?.value,
            motherPhoneNumber: form.get('motherPhoneNumber')?.value,
            note: form.get('note')?.value,
          };
          this.studentService.create(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getStudent();
          });
        }
        return false;
      },
    });
  }

  editStudentModal(student: Student) {
    const modal = this.modal.create({
      nzTitle: 'Cập nhật sinh viên',
      nzContent: EditStudentModalComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzComponentParams: {
        student: student,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            facultyId: form.get('facultyId')?.value,
            classId: form.get('classId')?.value,
            studentCode: student.studentCode,
            name: form.get('name')?.value,
            image: imageUrl,
            studentYear: form.get('studentYear')?.value,
            idCard: form.get('idCard')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
            sex: form.get('sex')?.value,
            date: form.get('date')?.value,
            address: form.get('address')?.value,
            ethnic: form.get('ethnic')?.value,
            religion: form.get('religion')?.value,
            fatherName: form.get('fatherName')?.value,
            fatherJob: form.get('fatherJob')?.value,
            fatherPhoneNumber: form.get('fatherPhoneNumber')?.value,
            motherName: form.get('motherName')?.value,
            motherJob: form.get('motherJob')?.value,
            motherPhoneNumber: form.get('motherPhoneNumber')?.value,
            note: form.get('note')?.value,
          };
          this.studentService.update(student.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getStudent();
          });
        }
        return false;
      },
    });
  }

  openStudentDetail(student: Student) {
    this.modal.create({
      nzTitle: 'Chi tiết sinh viên',
      nzContent: DetailStudentComponent,
      nzViewContainerRef: this.viewcontainerRef,
      nzWidth: 800,
      nzWrapClassName: 'student-detail',
      nzComponentParams: {
        student: student,
      },
      nzFooter: [
        {
          label: 'Close',
          onClick: () => this.modal.openModals[0]?.triggerOk(),
        },
      ],
    });
  }

  deleteItem(student: Student) {
    this.modal.warning({
      nzTitle: 'Xóa sinh viên',
      nzContent: `Bạn có chắc chắn muốn xóa sinh viên <b>${student.name}</b> không ?`,
      nzOnOk: () => {
        this.studentService.delete(student.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
          this.getStudent();
        });
      },
    });
  }
}
