import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiItemResponse, ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import { Dictionary } from '@frontend/models/dictionary.model';
import { Exam } from '@frontend/models/exam.model';
import { Question } from '@frontend/models/question.model';
import { ReadingContent } from '@frontend/models/reading-content.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { uniqBy, map as lodashMap } from 'lodash-es';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ExamManagerService } from '../../../service/exam-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-exam-question',
  templateUrl: './edit-exam-question.component.html',
  styleUrls: ['./edit-exam-question.component.scss'],
})
export class EditExamQuestionComponent implements OnInit {
  public examId!: number;
  public exam!: Exam;
  public questions: Question[] = [];
  public readingContents: ReadingContent[] = [];
  public examReadingContents: ReadingContent[] = [];
  public pagination!: ApiResponsePagination;
  public readingContentPagination!: ApiResponsePagination;
  public dictionary!: Dictionary;
  public init$: BehaviorSubject<{ exam: Exam } | null> = new BehaviorSubject<{ exam: Exam } | null>(null);

  @ViewChild('formAddQuestionByCategoryInputs', { static: true }) formAddQuestionByCategoryInputs!: NgxFormrAnchorComponent;
  @ViewChild('formInputsSearchQuestion', { static: true }) formInputsSearchQuestion!: NgxFormrAnchorComponent;
  @ViewChild('formInputsSearchreadingContent', { static: true }) formInputsSearchReadingContent!: NgxFormrAnchorComponent;

  public formAddQuestionByCategory = this.fb.group({
    categories: new UntypedFormControl(null, [Validators.required]),
    questionCount: new UntypedFormControl(null, [Validators.required])
  });

  public searchQuestionForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', [])
  });

  public searchReadingContentForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', [])
  });

  constructor(
    private ngxFormManager: NgxFormManager,
    private examManagerService: ExamManagerService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
    this.activatedRoute.parent?.params.subscribe((param) => {
      this.examId = Number(param['examId']);
      combineLatest([
        this.examManagerService.show(this.examId),
        this.store.select(ShellSelectors.getDictionary),
      ])
        .pipe(untilDestroyed(this))
        .subscribe(([result, dictionary]) => {
          if (result && dictionary) {
            this.dictionary = plainToInstance(Dictionary, dictionary);
            this.exam = plainToInstance(Exam, result.data);
            const examReadingContents = this.exam.questions.filter(i => i.readingContent).map(item => item.readingContent);
            this.examReadingContents = lodashMap(uniqBy(examReadingContents, 'id'), i => plainToInstance(ReadingContent, i));
            this.init$.next({ exam: this.exam });
          }
        });
    })
    this.activatedRoute.queryParams.subscribe(({ categoryId, keyword, page }) => {
      const paramQuestion: { limit?: number, categoryId?: number, keyword?: string, page?: number, hasReadingContent?: boolean } = { hasReadingContent: false, limit: 15 };
      if (categoryId) {
        paramQuestion.categoryId = categoryId;
      }
      if (keyword) {
        paramQuestion.keyword = keyword;
      }
      if (page) {
        paramQuestion.page = page;
      }
      this.examManagerService.getActiveQuestions(paramQuestion)
        .subscribe((result: ApiPaginateResponse<Question>) => {
          this.questions = result.data.map(i => plainToInstance(Question, i));
          this.pagination = result.meta.pagination;
        })
    })

    this.activatedRoute.queryParams.subscribe(({ categoryIdReadingContent, keywordReadingContent, pageReadingContent }) => {
      const paramReadingContent: { limit?: number, categoryId?: number, keyword?: string, page?: number, hasReadingContent?: boolean } = { hasReadingContent: false, limit: 2 };
      if (categoryIdReadingContent) {
        paramReadingContent.categoryId = categoryIdReadingContent;
      }
      if (keywordReadingContent) {
        paramReadingContent.keyword = keywordReadingContent;
      }
      if (pageReadingContent) {
        paramReadingContent.page = pageReadingContent;
      }
      this.examManagerService.getActiveReadingContent(paramReadingContent)
        .subscribe((result: ApiPaginateResponse<ReadingContent>) => {
          this.readingContents = result.data.map(i => plainToInstance(ReadingContent, i));
          this.readingContentPagination = result.meta.pagination;
        })
    })
  }

  ngOnInit(): void {
    this.init$.pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          const addQuestionByCategoryNgxform = this.ngxFormManager.init(this.formAddQuestionByCategory, {
            categories: {
              component: SelectControlComponent,
              option: {
                placeholder: 'Chọn danh mục',
                nzSize: 'large',
                type: 'text',
                className: ['col-6'],
                nzMode: 'multiple',
                nzOptions: this.dictionary.category.map((item) => ({
                  label: item.name,
                  value: item,
                })),
              },
            },
            questionCount: {
              component: TextControlComponent,
              option: {
                placeholder: 'Nhập số câu hỏi trắc nghiệm',
                nzSize: 'large',
                className: ['col-6'],
              },
            },
          })
          this.ngxFormManager.render(addQuestionByCategoryNgxform, this.formAddQuestionByCategoryInputs.viewContainerRef)
          const searchQuestionNgxForm = this.ngxFormManager.init(this.searchQuestionForm, {
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
                placeholder: 'Tìm kiếm tên câu hỏi',
                nzSize: 'large',
                className: ['col-6'],
              },
            },
          })
          this.ngxFormManager.render(searchQuestionNgxForm, this.formInputsSearchQuestion.viewContainerRef)
          const searchReadingContentNgxForm = this.ngxFormManager.init(this.searchReadingContentForm, {
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
                placeholder: 'Tìm kiếm tên câu hỏi',
                nzSize: 'large',
                className: ['col-6'],
              },
            },
          })
          this.ngxFormManager.render(searchReadingContentNgxForm, this.formInputsSearchReadingContent.viewContainerRef)
        }
      })

  }

  private getExam(examId: number) {
    this.examManagerService.show(examId)
      .pipe(untilDestroyed(this))
      .subscribe((result: ApiItemResponse<Exam>) => {
        this.exam = plainToInstance(Exam, result.data);
      });
  }

  addQuestionByCategory(): void {
    if (this.formAddQuestionByCategory.invalid) {
      this.ngxFormManager.markAllAsDirty(this.formAddQuestionByCategory);
    } else {
      const categories: Category[] = this.formAddQuestionByCategory.get('categories').value;
      const questionCount = this.formAddQuestionByCategory.get('questionCount').value;
      this.examManagerService.addQuestionByCategory(this.examId, { categoryIds: categories.map(item => item.id), questionCount })
        .subscribe(() => {
          this.getExam(this.examId);
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 })
        })
    }
  }

  searchQuestion() {
    const category: Category = this.searchQuestionForm.get('category').value;
    const keyword: string = this.searchQuestionForm.get('keyword').value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute, queryParams: {
        categoryId: category?.id ?? '',
        keyword: keyword ?? '',
        page: 1,
      },
    })
  }

  searchReadingContent() {
    const category: Category = this.searchReadingContentForm.get('category').value;
    const keyword: string = this.searchReadingContentForm.get('keyword').value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute, queryParams: {
        categoryIdReadingContent: category?.id ?? '',
        keywordReadingContent: keyword ?? '',
        pageReadingContent: 1,
      },
    })
  }

  addQuestion(item: Question): void {
    this.examManagerService.addQuestion(this.examId, item.id)
      .subscribe(() => {
        this.getExam(this.examId);
        this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 })
      })
  }

  addReadingContent(item: ReadingContent): void {
    this.examManagerService.addManyQuestion(this.examId, item.questions.map(i => i.id))
      .subscribe(() => {
        this.getExam(this.examId);
        this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.create'), { nzDuration: 3000 })
      })
  }

  filterReadingContentQuestion(items: Question[]): Question[] {
    return items.filter(i => i.readingContentId === null);
  }

  remove(item: Question): void {
    this.modal.warning({
      nzTitle: 'Xoá câu hỏi',
      nzContent: `Bạn đang xoá câu hỏi ${item.question}`,
      nzOnOk: () => {
        this.examManagerService.removeQuestion(this.examId, item.id)
          .subscribe(() => {
            this.getExam(this.examId);
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 })
          })
      }
    });
  }

  removeReadingContent(item: ReadingContent): void {
    this.modal.warning({
      nzTitle: 'Xoá câu hỏi',
      nzContent: `Bạn đang xoá câu hỏi ${item.title}`,
      nzOnOk: () => {
        this.examManagerService.removeReadingContent(this.examId, item.id)
          .subscribe(() => {
            this.getExam(this.examId);
            this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.delete'), { nzDuration: 3000 })
          })
      }
    });
  }

  gotoPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge'
    });
  }

}
