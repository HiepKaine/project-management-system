import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { HomeService } from '../home.service';

enum PostType {
  congChuc = 1,
  vienChuc = 2,
  examPack = 3
}

@UntilDestroy()
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public courses: Course[] = [];
  public examPacks: ExamPack[] = [];
  public pagination!: ApiResponsePagination;
  public isFree!: number;
  public currentPage!: number;
  public keyword!: string;

  public currentPostType$: BehaviorSubject<{ postType: number, page: number, keyword: string, isFree: number | string }>
    = new BehaviorSubject<{ postType: number, page: number, keyword: string, isFree: number | string }>
      ({ postType: PostType.congChuc, page: 1, keyword: '', isFree: '' });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    keyword: new UntypedFormControl('', []),
  });
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
  ) {
    this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((data: Params) => {
      this.currentPage = pageParser(data['page']);
      this.keyword = data['keyword'] ?? '';
      this.isFree = data['isFree'] ?? '';
      if (Array.isArray(this.activatedRoute.snapshot.url) && this.activatedRoute.snapshot.url.length > 0) {
        switch (this.activatedRoute.snapshot.url[0].path) {
          case 'khoa-on-cong-chuc':
            this.currentPostType$.next({ postType: PostType.congChuc, page: this.currentPage, keyword: this.keyword, isFree: this.isFree });
            break;
          case 'khoa-on-vien-chuc':
            this.currentPostType$.next({ postType: PostType.vienChuc, page: this.currentPage, keyword: this.keyword, isFree: this.isFree });
            break;
          case 'phong-thi-trac-nghiem-online':
            this.currentPostType$.next({ postType: PostType.examPack, page: this.currentPage, keyword: this.keyword, isFree: this.isFree });
            break;
        }
      } else {
        this.currentPostType$.next({ postType: PostType.congChuc, page: this.currentPage, keyword: this.keyword, isFree: this.isFree });
      }
    })
  }

  ngOnInit(): void {
    this.currentPostType$.pipe(distinctUntilChanged())
      .subscribe((data: { postType: number, page: number, keyword: string, isFree: number | string }) => {
        if (data.postType === PostType.congChuc || data.postType === PostType.vienChuc) {
          this.homeService.getCourse({ page: data.page, type: data.postType, limit: 8, keyword: data.keyword, isFree: data.isFree })
            .subscribe((result: ApiPaginateResponse<Course>) => {
              this.courses = result.data.map((item) =>
                plainToInstance(Course, item)
              );
              this.pagination = result.meta.pagination;
            });
        } else {
          this.homeService.getExamPack({ page: data.page, limit: 8, keyword: data.keyword, isFree: data.isFree })
            .subscribe((result: ApiPaginateResponse<ExamPack>) => {
              this.examPacks = result.data.map((item) =>
                plainToInstance(ExamPack, item)
              );
              this.pagination = result.meta.pagination;
            });
        }
      })


    const ngxform = this.ngxFormManager.init(this.searchForm, {
      keyword: {
        component: TextControlComponent,
        option: {
          placeholder: 'Tìm kiếm khóa học của bạn...',
          nzSize: 'large',
          className: ['col-12'],
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }

  search() {
    const keyword: string = this.searchForm.get('keyword')?.value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        keyword: keyword ?? '',
      },
      queryParamsHandling: 'merge',
    });
  }

  change(value: string) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        isFree: value ?? '',
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
