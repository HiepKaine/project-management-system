import { plainToInstance } from 'class-transformer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { Dictionary } from '@frontend/models/dictionary.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { FormControl, NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from '../../course/course.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@UntilDestroy()
@Component({
  selector: 'app-add-user-course-modal',
  templateUrl: './add-user-course-modal.component.html',
  styleUrls: ['./add-user-course-modal.component.scss'],
})
export class AddUserCourseModalComponent implements OnInit {
  public courses: Course[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;
  public renderFormInput$: BehaviorSubject<Dictionary | null> = new BehaviorSubject<Dictionary | null>(null);
  public filter$: BehaviorSubject<{ categoryId?: number, keyword?: string, page?: number } | null> = new BehaviorSubject<{ categoryId?: number, keyword?: string, page?: number } | null>(null);

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  public form = this.fb.group({
    category: new FormControl(null, []),
    keyword: new FormControl('', [])
  });

  public selectedCourse!: Course;

  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private ngxFormManager: NgxFormManager,
    private store: Store,
    private courseService: CourseService,
    private modal: NzModalService
  ) {
    this.store.select(ShellSelectors.getDictionary)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.dictionary = plainToInstance(Dictionary, data)
          this.renderFormInput$.next(this.dictionary);
        }
      })
    this.filter$
      .pipe(untilDestroyed(this))
      .subscribe((data: { categoryId?: number, keyword?: string } | null) => {
        this.courseService.get(data ?? {}).subscribe((result: ApiPaginateResponse<Course>) => {
          this.courses = result.data.map(item => plainToInstance(Course, item));
          this.pagination = result.meta.pagination;
        })
      })
  }

  ngOnInit(): void {
    this.renderFormInput$.subscribe((dictionary) => {
      if (dictionary) {
        const keyword = this.activatedRoute.snapshot.queryParams['keyword'];
        if (keyword) this.form.patchValue({ keyword });
        const categoryId = this.activatedRoute.snapshot.queryParams['categoryId'];
        if (categoryId) {
          const category = dictionary.category.find(item => item.id === Number(categoryId));
          if (category) this.form.patchValue({ category });
        }
        const searchNgxForm = this.ngxFormManager.init(this.form, {
          category: {
            component: SelectControlComponent,
            option: {
              placeholder: 'Chọn danh mục',
              nzSize: 'large',
              type: 'text',
              className: ['col-6'],
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
              className: ['col-6'],
            },
          },
        })
        this.ngxFormManager.render(searchNgxForm, this.formInputs.viewContainerRef)
      }
    })
  }

  search(): void {
    const categoryId = this.form.get('category')?.value?.id ?? '';
    const keyword = this.form.get('keyword')?.value ?? '';
    this.filter$.next({ categoryId, keyword })
  }

  gotoPage(page: number) {
    const categoryId = this.form.get('category')?.value?.id ?? '';
    const keyword = this.form.get('keyword')?.value ?? '';
    this.filter$.next({ categoryId, keyword, page })
  }

  select(item: Course) {
    this.selectedCourse = item;
    this.modal.openModals[0].triggerOk();
  }
}
