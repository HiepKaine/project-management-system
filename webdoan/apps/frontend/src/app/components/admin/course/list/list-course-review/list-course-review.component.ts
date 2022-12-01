import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { Review } from '@frontend/models/review.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseService } from '../../course.service';
import { AddReviewModalComponent } from '../../edit/add-review-modal/add-review-modal.component';
import { EditCourseReviewComponent } from '../../edit/edit-course-review/edit-course-review.component';

@UntilDestroy()
@Component({
  selector: 'app-list-course-review',
  templateUrl: './list-course-review.component.html',
  styleUrls: ['./list-course-review.component.scss'],
})
export class ListCourseReviewComponent implements OnInit {
  public courseId!: number;
  public reviews: Review[] = [];
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private viewContainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.courseId = Number(param['courseId']);
    });
  }

  private getReview(courseId: number) {
    this.courseService
      .getReview(courseId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiCollectionResponse<Review>) => {
        this.reviews = plainToInstance(Review, result.data);
      });
  }

  ngOnInit(): void {
    this.getReview(this.courseId);
  }

  openAddReviewModal() {
    const modal = this.modal.create({
      nzTitle: 'Thêm review',
      nzContent: AddReviewModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            image: imageUrl,
            user: form.get('user')?.value,
            review: form.get('review')?.value,
            rateCount: form.get('rateCount')?.value,
            type: 1,
            reviewableId: this.courseId,
          };
          this.courseService.addReview(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            this.getReview(this.courseId);
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  openEditReviewModal(item: Review) {
    const modal = this.modal.create({
      nzTitle: 'Sửa review',
      nzContent: EditCourseReviewComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        review: item,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.valid) {
          const data = {
            image: form.get('image')?.value[0]?.url ?? null,
            user: form.get('user')?.value,
            review: form.get('review')?.value,
            rateCount: form.get('rateCount')?.value,
            type: item.reviewableType,
            reviewableId: item.reviewableId,
          };
          this.courseService.updateReview(item.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.update'),
              { nzDuration: 3000 }
            );
            this.getReview(this.courseId);
            modal.destroy();
          });
        } else {
          this.ngxFormManager.markAllAsDirty(form);
        }
        return false;
      },
    });
  }

  deleteItem(item: Review) {
    this.modal.warning({
      nzTitle: 'Xóa review',
      nzContent: `Bạn đang xóa review của ${item.user}`,
      nzOnOk: () => {
        this.courseService.deleteReview(item.id).subscribe(() => {
          this.getReview(this.courseId);
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
