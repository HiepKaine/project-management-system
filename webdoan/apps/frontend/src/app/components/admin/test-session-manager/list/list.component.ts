import { pageParser } from './../../../../@core/utils/query-parser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { TestSession } from '@frontend/models/test-session.model';
import { plainToInstance } from 'class-transformer';
import * as moment from 'moment';
import { TestSessionManagerService } from '../test-session-manager.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { Dictionary } from '@frontend/models/dictionary.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Category } from '@frontend/models/category.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public categorys: Category[] = [];
  public testSessions: TestSession[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;

  @ViewChild('searchFormInputs', { static: true })
  formInput!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', []),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private modal: NzModalService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private testSessionManagerService: TestSessionManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngxFormManager: NgxFormManager,
    private store: Store
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const categoryId = data['categoryId'] ?? '';
        const keyword = data['keyword'] ?? '';
        this.getTestSession({ page, categoryId, keyword });
      });
  }

  ngOnInit(): void {
    this.store
      .select(ShellSelectors.getDictionary)
      .pipe(untilDestroyed(this))
      .subscribe((dictionary: Dictionary | undefined) => {
        if (dictionary) {
          this.categorys = plainToInstance(Category, dictionary.category);

          const ngxform = this.ngxFormManager.init(this.searchForm, {
            category: {
              component: SelectControlComponent,
              option: {
                placeholder: 'Chọn danh mục',
                nzSize: 'large',
                type: 'text',
                className: ['col-12', 'col-sm-6'],
                nzOptions: this.categorys.map((item) => ({
                  label: item.name,
                  value: item,
                })),
              },
            },
            keyword: {
              component: TextControlComponent,
              option: {
                placeholder: 'Tìm kiếm theo email',
                nzSize: 'large',
                className: ['col-12', 'col-sm-6'],
              },
            },
          });
          this.ngxFormManager.render(ngxform, this.formInput.viewContainerRef);
        }
      });
  }

  private getTestSession(param?: {
    page?: number;
    categoryId?: number;
    keyword?: string;
  }) {
    this.testSessionManagerService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<TestSession>) => {
        this.testSessions = plainToInstance(TestSession, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  passExam(examId: number): boolean {
    const exam = this.testSessions.find((item) => item.examId === examId);
    if (exam) {
      const totalQuestionCorrect = exam.correctQuestion;
      const totalQuestion =
        exam.inCorrectQuestion + exam.skipQuestion + exam.correctQuestion;
      if (totalQuestionCorrect >= totalQuestion / 2) {
        return true;
      } else return false;
    }
    return false;
  }

  getExamTime(item: TestSession): number {
    const startAt = moment(item.startTime);
    const completedAt = moment(item.completedAt);
    return completedAt.diff(startAt, 'm');
  }

  gotoPage(page: number) {
    this.router.navigate([], {
      queryParams: { page },
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
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

  remove(item: TestSession): void {
    this.modal.warning({
      nzTitle: 'Xoá kết quả thi',
      nzContent: `Bạn đang xoá kết quả thi của học viên ${item.user.getFullName()}`,
      nzOnOk: () => {
        this.testSessionManagerService.delete(item.id).subscribe(() => {
          const page = pageParser(
            this.activatedRoute.snapshot.queryParams['page']
          );
          const categoryId =
            this.activatedRoute.snapshot.queryParams['categoryId'] ?? '';
          const keyword =
            this.activatedRoute.snapshot.queryParams['keyword'] ?? '';
          this.getTestSession({ page, categoryId, keyword });
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
