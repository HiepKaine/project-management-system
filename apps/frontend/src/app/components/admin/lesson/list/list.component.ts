import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { pageParser } from './../../../../@core/utils/query-parser';

import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Lesson } from '@frontend/models/lesson.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';

import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Category } from '@frontend/models/category.model';
import { Dictionary } from '@frontend/models/dictionary.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { BehaviorSubject } from 'rxjs';
import * as LessonManagerActions from '../+state/lesson-manager.actions';
import * as LessonManagerSelectors from '../+state/lesson-manager.selectors';
import { PlayerComponent } from '../player/player.component';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public keyword!: string;
  public lessons: Lesson[] = [];
  public pagination!: ApiResponsePagination;

  public renderFormInput$: BehaviorSubject<Dictionary | null> =
    new BehaviorSubject<Dictionary | null>(null);
  public dictionary!: Dictionary;
  @ViewChild('searchFormInputs', { static: true })
  formInputsSearchQuestion!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', []),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef
  ) {
    this.store
      .select(LessonManagerSelectors.getLessonList)
      .pipe(untilDestroyed(this))
      .subscribe((data: ApiPaginateResponse<Lesson> | undefined) => {
        if (data && Array.isArray(data.data)) {
          this.lessons = data.data.map((item) => plainToInstance(Lesson, item));
          this.pagination = data.meta.pagination;
        }
      });
    this.activatedRoute.queryParams.subscribe((data: Params) => {
      const page = pageParser(data['page']);
      const categoryId = data['categoryId'] ?? '';
      const keyword = data['keyword'] ?? '';
      this.store.dispatch(
        LessonManagerActions.fetchLessonRequested({
          payload: { page, categoryId, keyword },
        })
      );
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

  deleteItem(item: Lesson) {
    this.modal.warning({
      nzTitle: 'Xoá bài giảng',
      nzContent: `Bạn có chắc chắn muốn xoá bài giảng <b>${item.name}</b>`,
      nzOnOk: () => {
        this.store.dispatch(
          LessonManagerActions.removeLessonRequested({ payload: item })
        );
      },
    });
  }

  openPreviewModal(lesson: Lesson) {
    this.modal.create({
      nzTitle: `${lesson.name}`,
      nzContent: PlayerComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: 800,
      nzWrapClassName: 'lesson',
      nzComponentParams: {
        lesson: lesson,
      },
      nzFooter: [
        {
          label: "Close",
          onClick: () => this.modal.openModals[0]?.triggerOk()
        }
      ]
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
