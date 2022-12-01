import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { ReadingContent } from '@frontend/models/reading-content.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ReadingContentService } from '../../service/reading-content.service';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { Category } from '@frontend/models/category.model';
import { pageParser } from 'apps/frontend/src/app/@core/utils/query-parser';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public keyword!: string;
  public readingContents: ReadingContent[] = [];
  public pagination!: ApiResponsePagination;
  public dictionary!: Dictionary;

  public searchForm = this.fb.group({
    keyword: new UntypedFormControl('', []),
    category: new UntypedFormControl(null, []),
  })

  @ViewChild('searchFormInputs', { static: true })
  searchFormInputs!: NgxFormrAnchorComponent
  constructor(
    private readingContentService: ReadingContentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private store: Store,
  ) {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        const categoryId = data['categoryId'] ?? '';
        const keyword = data['keyword'] ?? '';
        this.getData({ page, categoryId, keyword });
      });
  }

  private getData(param?: {
    page?: number;
    categoryId?: number;
    keyword?: string;
  }): void {
    this.readingContentService.get(param ?? {})
      .subscribe((result: ApiPaginateResponse<ReadingContent>) => {
        this.readingContents = result.data.map(item => plainToInstance(ReadingContent, item));
        this.pagination = result.meta.pagination;
      })
  }


  remove(item: ReadingContent): void {
    this.modal.warning({
      nzTitle: 'Xoá đề thi',
      nzContent: `Bạn đang xoá bài đọc ${item.title}`,
      nzOnOk: () => {
        this.readingContentService.delete(item.id)
          .subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.delete'),
              { nzDuration: 3000 }
            )
            this.getData();
          })
      }
    });
  }

  ngOnInit(): void {
    this.store.select(ShellSelectors.getDictionary).subscribe((data) => {
      if (data) {
        this.dictionary = plainToInstance(Dictionary, data)

        const ngxform = this.ngxFormManager.init(this.searchForm, {
          category: {
            component: SelectControlComponent,
            option: {
              placeholder: 'Chọn danh mục',
              nzSize: 'large',
              type: 'text',
              nzOptions: this.dictionary.category.map((item) => ({
                label: item.name,
                value: item
              })),
              className: ['col-12', 'col-sm-6'],
            }
          },
          keyword: {
            component: TextControlComponent,
            option: {
              placeholder: 'Tìm kiếm câu hỏi',
              nzSize: 'large',
              className: ['col-12', 'col-sm-6'],
            }
          }
        })
        this.ngxFormManager.render(ngxform, this.searchFormInputs.viewContainerRef)
      }
    })

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
      queryParamsHandling: 'merge'
    });
  }
}
