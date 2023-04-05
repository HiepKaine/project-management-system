import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCollectionResponse } from '@frontend/common';
import { Review } from '@frontend/models/review.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddExamPackReviewComponent } from '../../edit/add-exam-pack-review/add-exam-pack-review.component';
import { EditExamPackReviewComponent } from '../../edit/edit-exam-pack-review/edit-exam-pack-review.component';
import { ExamPackManagerService } from '../../exam-pack-manager.service';
@UntilDestroy()
@Component({
  selector: 'app-list-exam-pack-review',
  templateUrl: './list-exam-pack-review.component.html',
  styleUrls: ['./list-exam-pack-review.component.scss'],
})
export class ListExamPackReviewComponent {
  // public examPackId!: number;
  // public reviews: Review[] = [];

  // constructor(
  //   private modal: NzModalService,
  //   private translate: TranslateService,
  //   private ngxFormManager: NgxFormManager,
  //   private activatedRoute: ActivatedRoute,
  //   private viewContainerRef: ViewContainerRef,
  //   private examPackService: ExamPackManagerService,
  //   private notificationService: NotificationService
  // ) {
  //   this.activatedRoute.parent?.params.subscribe((param) => {
  //     this.examPackId = Number(param['id']);
  //   });
  // }

  // private getReview(examPackId: number) {
  //   this.examPackService
  //     .getReview(examPackId)
  //     .pipe(untilDestroyed(this))
  //     .subscribe((result: ApiCollectionResponse<Review>) => {
  //       this.reviews = plainToInstance(Review, result.data);
  //     });
  // }

  // ngOnInit(): void {
  //   this.getReview(this.examPackId);
  // }

  // openAddReviewModal() {
  //   const modal = this.modal.create({
  //     nzTitle: 'Thêm review',
  //     nzContent: AddExamPackReviewComponent,
  //     nzViewContainerRef: this.viewContainerRef,
  //     nzComponentParams: {},
  //     nzOnOk: () => {
  //       const form = modal.getContentComponent().form;
  //       if (form.invalid) {
  //         this.ngxFormManager.markAllAsDirty(form);
  //       } else {
  //         const data = {
  //           image: form.get('image')?.value[0]?.url ?? null,
  //           user: form.get('user')?.value,
  //           review: form.get('review')?.value,
  //           rateCount: form.get('rateCount')?.value,
  //           type: 2,
  //           reviewableId: this.examPackId,
  //         };
  //         this.examPackService.addReview(data).subscribe(() => {
  //           this.notificationService.success(
  //             this.translate.instant('success.title'),
  //             this.translate.instant('success.create'),
  //             { nzDuration: 3000 }
  //           );
  //           this.getReview(this.examPackId);
  //           modal.destroy();
  //         });
  //       }
  //       return false;
  //     },
  //   });
  // }

  // openEditReviewModal(item: Review) {
  //   const modal = this.modal.create({
  //     nzTitle: 'Sửa Review',
  //     nzContent: EditExamPackReviewComponent,
  //     nzViewContainerRef: this.viewContainerRef,
  //     nzComponentParams: {
  //       review: item,
  //     },
  //     nzOnOk: () => {
  //       const form = modal.getContentComponent().form;
  //       if (form.valid) {
  //         const data = {
  //           image: form.get('image')?.value[0]?.url ?? null,
  //           user: form.get('user')?.value,
  //           review: form.get('review')?.value,
  //           rateCount: form.get('rateCount')?.value,
  //           type: item.reviewableType,
  //           reviewableId: item.reviewableId,
  //         };
  //         this.examPackService.updateReview(item.id, data).subscribe(() => {
  //           this.notificationService.success(
  //             this.translate.instant('success.title'),
  //             this.translate.instant('success.update'),
  //             { nzDuration: 3000 }
  //           );
  //           this.getReview(this.examPackId);
  //           modal.destroy();
  //         });
  //       } else {
  //         this.ngxFormManager.markAllAsDirty(form);
  //       }
  //       return false;
  //     },
  //   });
  // }

  // deleteItem(item: Review) {
  //   this.modal.warning({
  //     nzTitle: 'Xóa review',
  //     nzContent: `Bạn đang xóa review của ${item.user}`,
  //     nzOnOk: () => {
  //       this.examPackService.deleteReview(item.id).subscribe(() => {
  //         this.getReview(this.examPackId);
  //         this.notificationService.success(
  //           this.translate.instant('success.title'),
  //           this.translate.instant('success.delete'),
  //           { nzDuration: 3000 }
  //         );
  //         this.getReview(this.examPackId);
  //       });
  //     },
  //   });
  // }
}
