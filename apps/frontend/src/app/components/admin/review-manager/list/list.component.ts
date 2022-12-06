import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Review } from '@frontend/models/review.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CourseService } from '../../course/course.service';
import { EditCourseReviewComponent } from '../../course/edit/edit-course-review/edit-course-review.component';
import { ReviewManagerService } from '../review-manager.service';
@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public reviews: Review[] = [];
  public pagination!: ApiResponsePagination;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private reviewService: ReviewManagerService,
    private modal: NzModalService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private viewContainerRef: ViewContainerRef,
    private ngxFormManager: NgxFormManager
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
        this.getReview(param);
      });
  }

  private getReview(param?: { keyword?: string; page?: number }) {
    this.reviewService
      .get(param)
      .subscribe((result: ApiPaginateResponse<Review>) => {
        this.reviews = result.data.map((item) => plainToInstance(Review, item));
        this.pagination = result.meta.pagination;
      });
  }

  search() {
    const params: NavigationExtras = {
      queryParams: { keyword: this.keyword, page: 1 },
      relativeTo: this.activatedRoute,
    };
    this.router.navigate([], params);
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page } };
    this.router.navigate(['/', 'admin', 'review-manager'], params);
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
            this.getReview();
            modal.destroy();
          });
        } else {
          this.ngxFormManager.markAllAsDirty(form);
        }
        return false;
      },
    });
  }
}
