import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse, ApiPaginateResponse } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { filter, forkJoin, of, OperatorFunction, switchMap } from 'rxjs';
import { User } from '@frontend/models/user.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Review } from '@frontend/models/review.model';
import { chunk } from 'lodash-es';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Exam } from '@frontend/models/exam.model';
import { TestSession } from '@frontend/models/test-session.model';
import { ExamPackService } from '../exam-pack.service';

@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public profile: User | null = null;
  public isBoughtExamPack = false;
  public examPackId!: number;
  public examPack!: ExamPack;
  public course: Course | null = null;
  public courses: Course[] = [];
  public exams: ExamPack[] = [];
  public reviews: Review[] = [];
  public apiLoaded = false;
  public relatedExamPacks: ExamPack[] = [];
  public relatedExamPackGroup: Array<ExamPack[]> = [];
  public highlightCourses: Course[] = [];
  public remainingExamTime: Array<{ examId: number, remaining: number | null, retry: number }> = [];
  public pageReview = 1

  constructor(
    private examPackService: ExamPackService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ examPackId }) => {
      this.examPackId = examPackId;
      this.getExamPackDetail(examPackId);
      this.getRelatedExampPacks(examPackId);
      this.getHighlightCourses(examPackId);
      this.check();
      this.getReview();
    })

    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  private check(): void {
    this.store.select(ShellSelectors.getShellProfile)
      .pipe(
        untilDestroyed(this),
        filter((user: User | undefined) => user !== undefined) as OperatorFunction<User | undefined, User>,
        switchMap((user: User) => forkJoin([of(user), this.examPackService.userBoughtExamPack(this.examPackId)]))
      )
      .subscribe(([user, isBoughtExamPack]) => {
        if (user) this.profile = user;
        if (isBoughtExamPack) {
          this.isBoughtExamPack = isBoughtExamPack;
          this.getRemainingExamTime(this.examPackId);
        }
      })
  }

  private getExamPackDetail(examPackId: number) {
    this.examPackService.show(examPackId).subscribe((result: ApiItemResponse<ExamPack>) => {
      this.examPack = plainToInstance(ExamPack, result.data);
    });
  }

  private getRemainingExamTime(examPackId: number) {
    this.examPackService.getRemainingExamTime(examPackId).subscribe((result: ApiCollectionResponse<{ examId: number, remaining: number | null, retry: number }>) => {
      this.remainingExamTime = result.data;
    });
  }

  loadMoreReview() {
    this.pageReview += 1
    this.examPackService.getReview(this.examPackId, { page: this.pageReview }).subscribe((result: ApiCollectionResponse<Review>) => {
      const review = result.data.map(item => plainToInstance(Review, item));
      this.reviews.push(...review)
    })
  }

  private getReview() {
    this.examPackService.getReview(this.examPackId).subscribe((result: ApiCollectionResponse<Review>) => {
      this.reviews = result.data.map(item => plainToInstance(Review, item));
    })
  }

  private getRelatedExampPacks(examPackId: number) {
    this.examPackService.getRelatedExamPack(examPackId)
      .subscribe((result: ApiCollectionResponse<ExamPack>) => {
        this.relatedExamPacks = plainToInstance(ExamPack, result.data);
        this.relatedExamPackGroup = chunk(this.relatedExamPacks, 4);
      });
  }

  private getHighlightCourses(examPackId: number) {
    this.examPackService
      .getHighlightCourse(examPackId)
      .subscribe((result: ApiPaginateResponse<Course>) => {
        this.highlightCourses = plainToInstance(Course, result.data);
      });
  }

  buyFreeExamPack() {
    this.modal.confirm({
      nzTitle: 'Thêm khoá học miễn phí',
      nzContent: `Thêm khoá học ${this.examPack.name} vào danh sách gói trắc nghiệm của bạn`,
      nzOnOk: () => {
        this.examPackService.addFreeExamPack(this.examPack.id).subscribe(() => {
          this.check();
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 });
        })
      }
    });
  }

  createTestSession(item: Exam) {
    this.examPackService.createTestSession(this.examPackId, item.id).subscribe((result: ApiItemResponse<TestSession>) => {
      this.router.navigate(['/', 'de-thi', result.data.id, 'test']);
    })
  }

  getRemainingTime(examId: number): number | null {
    const item = this.remainingExamTime.find(item => item.examId === examId);
    if (item) {
      return item.remaining;
    } else {
      return null;
    }
  }

}
