import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxFormModule } from '@ngxform/platform';

import { ContactManagerEffects } from './+state/contact-manager.effects';
import * as fromContactManager from './+state/contact-manager.reducer';
import { ContactService } from './contact.service';
import { ContactRoutingModule } from './contact-routing.module';
import { CreateContactModalComponent } from './create-contact-modal/create-contact-modal.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
];
const NZ_MODULES = [
  NzTableModule,
  NzModalModule,
  NzInputModule,
  NzButtonModule,
  NzFormModule,
  NzPaginationModule,
  NzBreadCrumbModule,
  NzIconModule.forChild(icons),
];

@NgModule({
  declarations: [CreateContactModalComponent, EditComponent, ListComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    ...NZ_MODULES,
    StoreModule.forFeature(
      fromContactManager.CONTACT_MANAGER_FEATURE_KEY,
      fromContactManager.reducer
    ),
    EffectsModule.forFeature([ContactManagerEffects]),
  ],
  providers: [ContactService],
})
export class ContactModule {}
