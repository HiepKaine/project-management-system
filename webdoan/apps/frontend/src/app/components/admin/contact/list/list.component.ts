import { pageParser } from './../../../../@core/utils/query-parser';
import {
  Component,
  ViewContainerRef,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  ActivatedRoute,
  NavigationExtras,
  Params
} from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { filter } from 'rxjs';

import {
  ApiPaginateResponse,
  ApiResponsePagination,
} from '@frontend/common';
import { Contact } from '@frontend/models/contact.model';
import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { NgxFormManager } from '@ngxform/platform';

import * as ContactManagerActions from '../+state/contact-manager.actions';
import * as ContactManagerSelectors
  from '../+state/contact-manager.selectors';
import { ContactService } from '../contact.service';
import {
  CreateContactModalComponent,
} from '../create-contact-modal/create-contact-modal.component';


@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public keyword!: string;
  public contacts: Contact[] = [];
  public pagination!: ApiResponsePagination
  constructor(
    private modal: NzModalService,
    private router: Router,
    private store: Store,
    private contactService: ContactService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams
      .pipe(
        untilDestroyed(this)
      )
      .subscribe((data: Params) => {
        const page = pageParser(data['page']);
        this.store.dispatch(ContactManagerActions.fetchContactRequested({ payload: { page } }));
        this.store.select(ContactManagerSelectors.getContactList).pipe(untilDestroyed(this)).subscribe((data: ApiPaginateResponse<Contact> | undefined) => {
          if (data && Array.isArray(data.data)) {
            this.contacts = data.data.map(item => plainToInstance(Contact, item));
            this.pagination = data.meta.pagination;
          }
        })
      })
  }


  openCreateContactModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Thêm liên hệ',
      nzContent: CreateContactModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: 800,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          this.contactService.create({
            name: form.get('name')?.value,
            email: form.get('email')?.value,
            phone: form.get('phone')?.value,
            status: form.get('status')?.value,
            content: form.get('content')?.value,
          }).subscribe(() => {
            this.store.dispatch(ContactManagerActions.fetchContactRequested({}));
            modal.destroy();
          })
        }
        return false;
      },
    });
  }


  search() {
    this.store.dispatch(ContactManagerActions.fetchContactRequested({ payload: { keyword: this.keyword } }))
  }


  deleteItem(item: Contact) {
    this.modal.warning({
      nzTitle: 'Xoá danh mục',
      nzContent: `Bạn có chắc chắn muốn xoá danh mục <b>${item.name}</b>`,
      nzOnOk: () => {
        this.store.dispatch(ContactManagerActions.removeContactRequested({ payload: item }));
      }
    });
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page } };
    this.router.navigate(['/', 'admin', 'contact'], params);
  }
}
