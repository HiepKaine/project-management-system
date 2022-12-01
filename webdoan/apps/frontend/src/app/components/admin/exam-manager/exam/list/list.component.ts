import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiResponsePagination,
} from '@frontend/common';
import { Exam } from '@frontend/models/exam.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamManagerService } from '../../service/exam-manager.service';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { Dictionary } from '@frontend/models/dictionary.model';
import { Category } from '@frontend/models/category.model';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { Store } from '@ngrx/store';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public pagination!: ApiResponsePagination;
  public exams: Exam[] = [];
  public categorys: Category[] = [];
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  public searchForm = this.fb.group({
    category: new UntypedFormControl(null, []),
    keyword: new UntypedFormControl('', []),
  });

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private modal: NzModalService,
    private store: Store,
    private translate: TranslateService,
    private ngxFormManager: NgxFormManager,
    private activatedRoute: ActivatedRoute,
    private examManagerService: ExamManagerService,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const keyword = data['keyword'] ?? '';
        const categoryId = data['categoryId'] ?? '';
        this.getData({ page, categoryId, keyword });
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
                placeholder: 'Tìm kiếm theo tên đề thi',
                nzSize: 'large',
                className: ['col-12', 'col-sm-6'],
              },
            },
          });
          this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
        }
      });
  }

  private getData(param?: {
    page?: number;
    categoryId?: number;
    keyword?: string;
  }) {
    this.examManagerService
      .get(param ?? {})
      .subscribe((result: ApiPaginateResponse<Exam>) => {
        this.exams = result.data.map((i) => plainToInstance(Exam, i));
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

  remove(item: Exam) {
    this.modal.warning({
      nzTitle: 'Xoá gói trắc nghiệm',
      nzContent: `Bạn đang xoá khoá học ${item.name}`,
      nzOnOk: () => {
        this.examManagerService.delete(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.delete'),
            { nzDuration: 3000 }
          );
          const page = this.activatedRoute.snapshot.queryParams['page'] ?? 1;
          const categoryId =
            this.activatedRoute.snapshot.queryParams['categoryId'] ?? '';
          const keyword = this.activatedRoute.snapshot.queryParams['keyword'] ?? '';
          this.getData({ page, keyword, categoryId });
        });
      },
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
