import { Component, OnInit, ViewChild } from '@angular/core';
import { Dictionary } from '@frontend/models/dictionary.model';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { pageParser } from './../../../../@core/utils/query-parser';

import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApiCollectionResponse, ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '@frontend/models/category.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import * as CourseActions from '../+state/course.actions';
import * as CourseSelectors from '../+state/course.selectors';
import { CourseService } from '../course.service';
@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public courses: Course[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;
  private courseUserCount: Array<{ courseId: number, userCount: number }> = [];
  public renderFormInput$: BehaviorSubject<Dictionary | null> =
    new BehaviorSubject<Dictionary | null>(null);

  @ViewChild('searchFormInputs', { static: true })
  formInputsSearchQuestion!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    category: new FormControl(null, []),
    keyword: new FormControl('', []),
  });

  constructor(
    private store: Store,
    private modal: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private courseService: CourseService,
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe(({ page, categoryId, keyword }) => {
        page = pageParser(page);
        this.store.dispatch(
          CourseActions.fetchListCourseRequested({
            payload: {
              page,
              categoryId: categoryId ?? '',
              keyword: keyword ?? '',
            },
          })
        );
      });
    this.store
      .select(CourseSelectors.getListCourse)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiPaginateResponse<Course> | undefined) => {
        if (result && Array.isArray(result.data)) {
          this.courses = result.data.map((item) =>
            plainToInstance(Course, item)
          );
          this.pagination = result.meta.pagination;
          this.fetchCourseUserCount();
        }
      });

    this.store.select(ShellSelectors.getDictionary).subscribe((data) => {
      if (data) {
        this.dictionary = plainToInstance(Dictionary, data);
        this.renderFormInput$.next(this.dictionary);
      }
    });
  }

  ngOnInit(): void {
    this.renderFormInput$.subscribe((dictionary) => {
      if (dictionary) {
        const keyword = this.activatedRoute.snapshot.queryParams['keyword'];
        if (keyword) this.searchForm.patchValue({ keyword });
        const categoryId =
          this.activatedRoute.snapshot.queryParams['categoryId'];
        if (categoryId) {
          const category = dictionary.category.find(
            (item) => item.id === Number(categoryId)
          );
          if (category) this.searchForm.patchValue({ category });
        }
        const searchNgxForm = this.ngxFormManager.init(this.searchForm, {
          category: {
            component: SelectControlComponent,
            option: {
              placeholder: 'Chọn danh mục',
              nzSize: 'large',
              type: 'text',
              className: ['col-12', 'col-sm-6'],
              nzOptions: this.dictionary.category.map((item) => ({
                label: item.name,
                value: item,
              })),
            },
          },
          keyword: {
            component: TextControlComponent,
            option: {
              placeholder: 'Tìm kiếm tên tên khoá học',
              nzSize: 'large',
              className: ['col-12', 'col-sm-6'],
            },
          },
        });
        this.ngxFormManager.render(
          searchNgxForm,
          this.formInputsSearchQuestion.viewContainerRef
        );
      }
    });
  }

  private fetchCourseUserCount(): void {
    this.courseService.fetchCourseUserCount(this.courses.map(item => item.id))
      .subscribe((result: ApiCollectionResponse<{ courseId: number, userCount: number }>) => {
        this.courseUserCount = result.data;
      })
  }

  getUserCount(courseId: number): number {
    const item = this.courseUserCount.find(item => item.courseId === courseId);
    return item ? item.userCount : 0;
  }

  deleteCourse(course: Course) {
    this.modal.warning({
      nzTitle: 'Xoá khoá học',
      nzContent: `Bạn đang xoá khoá học ${course.name}`,
      nzOnOk: () => {
        this.store.dispatch(
          CourseActions.removeCourseRequested({ payload: course })
        );
      },
    });
  }

  search() {
    const category: Category = this.searchForm.get('category')?.value;
    const keyword: string = this.searchForm.get('keyword')?.value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        categoryId: category?.id ?? '',
        keyword: keyword ?? '',
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
