import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { pageParser } from './../../../../../@core/utils/query-parser';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { plainToInstance } from 'class-transformer';

import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Question } from '@frontend/models/question.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { QuestionService } from '../../service/question.service';
import { Dictionary } from '@frontend/models/dictionary.model';
import { BehaviorSubject } from 'rxjs';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { Category } from '@frontend/models/category.model';

@UntilDestroy()
@Component({
  selector: 'app-question-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public keyword!: string;
  public questions: Question[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;
  public renderFormInput$: BehaviorSubject<Dictionary | null> =
    new BehaviorSubject<Dictionary | null>(null);

  @ViewChild('searchFormInputs', { static: true })
  formInputsSearchQuestion!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', []),
  });

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private store: Store
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe(({ page, keyword, categoryId }) => {
        page = pageParser(page);
        this.getQuestion({
          hasReadingContent: false,
          page,
          keyword: keyword ?? '',
          categoryId: categoryId ?? '',

        });
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

  private getQuestion(param?: {
    page?: number;
    keyword?: string;
    categoryId?: string;
    hasReadingContent?: boolean;
  }) {
    this.questionService
      .get(param)
      .subscribe((result: ApiPaginateResponse<Question>) => {
        this.questions = result.data.map((item) =>
          plainToInstance(Question, item)
        );
        this.pagination = result.meta.pagination;
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

  deleteItem(item: Question) {
    this.modal.warning({
      nzTitle: 'Xoá câu hỏi trắc nghiệm',
      nzContent: `Bạn đang xoá câu hỏi trắc nghiệm ${item.question}`,
      nzOnOk: () => {
        this.questionService.delete(item.id).subscribe(() => {
          const page = this.activatedRoute.snapshot.queryParams['page'];
          const keyword = this.activatedRoute.snapshot.queryParams['keyword'];
          this.getQuestion({ hasReadingContent: false, page: pageParser(page), keyword: keyword ?? '' });
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
        });
      },
    });
  }

  gotoPage(page: number) {
    const params: NavigationExtras = {
      queryParams: { page },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    };
    this.router.navigate([], params);
  }
}
