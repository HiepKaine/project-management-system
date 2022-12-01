import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Exam } from '@frontend/models/exam.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamPackManagerService } from '../../exam-pack-manager.service';
import { AddExamModalComponent } from '../add-exam-modal/add-exam-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-edit-exam-pack-exam',
  templateUrl: './edit-exam-pack-exam.component.html',
  styleUrls: ['./edit-exam-pack-exam.component.scss'],
})
export class EditExamPackExamComponent {
  public examPackId!: number;
  public examPack!: ExamPack;
  constructor(
    private ngxFormManager: NgxFormManager,
    private examPackManagerService: ExamPackManagerService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.examPackId = Number(param['id']);
      this.getExamPack(this.examPackId);
    })
  }

  private getExamPack(examPackId: number) {
    this.examPackManagerService.show(examPackId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<ExamPack>) => {
        this.examPack = plainToInstance(ExamPack, result.data);
      });
  }

  openAddExamModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm đề thi',
      nzContent: AddExamModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const examId = form.get('exam')?.value?.id;
          if (examId) {
            this.examPackManagerService.addExam(this.examPackId, examId).subscribe(() => {
              this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 });
              this.getExamPack(this.examPackId);
              modal.destroy();
            })
          } else {
            this.notificationService.success(this.translate.instant('error.title'), 'Vui lòng chọn bài giảng và thử lại', { nzDuration: 3000 });
          }
        }
        return false;
      },
    });
  }

  remove(item: Exam): void {
    this.modal.warning({
      nzTitle: 'Xoá đề thi',
      nzContent: `Bạn đang xoá đề thi ${item.name}`,
      nzOnOk: () => {
        this.examPackManagerService.removeExam(this.examPackId, item.id)
          .subscribe(() => {
            this.getExamPack(this.examPackId);
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 })
          })
      }
    });
  }
}
