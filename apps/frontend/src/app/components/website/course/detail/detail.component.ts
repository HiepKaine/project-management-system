import { chunk } from 'lodash-es';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCollectionResponse, ApiItemResponse, ApiPaginateResponse } from '@frontend/common';
import { Review } from '@frontend/models/review.model';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { filter, forkJoin, of, OperatorFunction, switchMap } from 'rxjs';
import { CourseService } from '../course.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public profile: User | null = null;
  public isBoughtCourse = false;
  public lessonCount = 0;
  public courseId!: number;
  public reviews: Review[] = [];
  public apiLoaded = false;
  public effect = 'scrollx';
  public pageReview = 1

  constructor(
    private courseSerive: CourseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.courseId = id;
      this.check();
      this.getReview();
    });

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
        filter((user: User | undefined) => user !== undefined) as OperatorFunction<User | undefined, User>,
        switchMap((user: User) => forkJoin([of(user), this.courseSerive.userBoughtCourse(this.courseId)]))
      )
      .subscribe(([user, isBoughtCourse]) => {
        if (user) this.profile = user;
        if (isBoughtCourse) this.isBoughtCourse = isBoughtCourse;
      })
  }

  loadMoreReview() {
    this.pageReview += 1
    this.courseSerive.getReview(this.courseId, { page: this.pageReview }).subscribe((result: ApiCollectionResponse<Review>) => {
      const review = result.data.map(item => plainToInstance(Review, item));
      this.reviews.push(...review)
    })
  }

  private getReview() {
    this.courseSerive.getReview(this.courseId).subscribe((result: ApiCollectionResponse<Review>) => {
      this.reviews = result.data.map(item => plainToInstance(Review, item));
    })
  }
}
