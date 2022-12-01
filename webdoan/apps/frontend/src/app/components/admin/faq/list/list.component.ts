import { pageParser } from './../../../../@core/utils/query-parser';
import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Faq } from '@frontend/models/faq.modal';
import { Store } from '@ngrx/store';
import { NgxFormManager } from '@ngxform/platform';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FaqService } from '../faq.service';

import * as FaqManagerActions from '../+state/faq-manager.actions';
import * as FaqManagerSelectors from '../+state/faq-manager.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { plainToInstance } from 'class-transformer';
import { CreateFaqModalComponent } from '../create-faq-modal/create-faq-modal.component';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public faqs: Faq[] = [];
  public pagination!: ApiResponsePagination;

  constructor(
    private modal: NzModalService,
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private faqService: FaqService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef,
    private translate: TranslateService,
    private notificationService: NotificationService,
  ) {
    this.store
      .select(FaqManagerSelectors.getFaqList)
      .pipe(untilDestroyed(this))
      .subscribe((data: ApiPaginateResponse<Faq> | undefined) => {
        if (data && Array.isArray(data.data)) {
          this.faqs = data.data.map((item) => plainToInstance(Faq, item));
          this.pagination = data.meta.pagination;
        }
      });

    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        this.store.dispatch(
          FaqManagerActions.fetchFaqRequested({ payload: { page } })
        );
      });
  }

  openCreateFaqModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm câu hỏi',
      nzContent: CreateFaqModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          this.faqService
            .create({
              question: form.get('question')?.value,
              answer: form.get('answer')?.value,
            })
            .subscribe(() => {
              this.store.dispatch(FaqManagerActions.fetchFaqRequested({}));
              this.notificationService.success(
                this.translate.instant('success.title'),
                this.translate.instant('success.create'),
                { nzDuration: 3000 }
              );
              modal.destroy();
            });
        }
        return false;
      },
    });
  }

  search() {
    this.store.dispatch(
      FaqManagerActions.fetchFaqRequested({
        payload: { keyword: this.keyword },
      })
    );
  }

  deleteItem(item: Faq) {
    this.modal.warning({
      nzTitle: 'Xóa câu hỏi',
      nzContent: `Bạn có chắc chắn muốn xóa câu hỏi <b>${item.question}</b>`,
      nzOnOk: () => {
        this.store.dispatch(
          FaqManagerActions.removeFaqRequested({ payload: item })
        );
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.delete'),
          { nzDuration: 3000 }
        );
      },
    });
  }

  gotoPage(page: number) {
    this.router.navigate(['/', 'admin', 'faq'], {
      queryParams: { page, keyword: this.keyword },
    });
  }
}
