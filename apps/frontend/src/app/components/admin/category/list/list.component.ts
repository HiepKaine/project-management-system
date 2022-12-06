import { Component, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { pageParser } from './../../../../@core/utils/query-parser';

import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Category } from '@frontend/models/category.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { NgxFormManager } from '@ngxform/platform';

import * as CategoryManagerActions from '../+state/category-manager.actions';
import * as CategoryManagerSelectors from '../+state/category-manager.selectors';
import { CategoryService } from '../category.service';
import { CreateCategoryModalComponent } from '../create-category-modal/create-category-modal.component';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public categories: Category[] = [];
  public pagination!: ApiResponsePagination;
  constructor(
    private modal: NzModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private categoryService: CategoryService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef
  ) {
    this.store
      .select(CategoryManagerSelectors.getCategoryList)
      .pipe(untilDestroyed(this))
      .subscribe((data: ApiPaginateResponse<Category> | undefined) => {
        if (data && Array.isArray(data.data)) {
          this.categories = data.data.map((item) =>
            plainToInstance(Category, item)
          );
          this.pagination = data.meta.pagination;
        }
      });
    this.activatedRoute.queryParams
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        this.store.dispatch(
          CategoryManagerActions.fetchCategoryRequested({ payload: { page } })
        );
      });
  }

  openCreateCategoryModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm danh mục',
      nzContent: CreateCategoryModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          this.categoryService
            .create({ name: form.get('name')?.value })
            .subscribe(() => {
              this.store.dispatch(
                CategoryManagerActions.fetchCategoryRequested({})
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
      CategoryManagerActions.fetchCategoryRequested({
        payload: { keyword: this.keyword },
      })
    );
  }

  deleteItem(item: Category) {
    this.modal.warning({
      nzTitle: 'Xoá danh mục',
      nzContent: `Bạn có chắc chắn muốn xoá danh mục <b>${item.name}</b>`,
      nzOnOk: () => {
        this.store.dispatch(
          CategoryManagerActions.removeCategoryRequested({ payload: item })
        );
      },
    });
  }

  gotoPage(page: number) {
    this.router.navigate(['/', 'admin', 'category'], {
      queryParams: { page, keyword: this.keyword },
    });
  }
}
