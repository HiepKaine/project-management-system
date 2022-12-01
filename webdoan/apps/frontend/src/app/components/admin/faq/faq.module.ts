import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { CreateFaqModalComponent } from './create-faq-modal/create-faq-modal.component';
import { FaqRoutingModule } from './faq-routing.module';
import { IconDefinition } from '@ant-design/icons-angular';
import { FaqService } from './faq.service';
import { NgxFormModule } from '@ngxform/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqManagerEffects } from './+state/faq-manager.effects';
import * as fromFaqManager from './+state/faq-manager.reducer';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TinymceControlModule } from '@webpress/form';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
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
  declarations: [ListComponent, EditComponent, CreateFaqModalComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule,
    ...NZ_MODULES,
    StoreModule.forFeature(
      fromFaqManager.FAQ_MANAGER_FEATURE_KEY,
      fromFaqManager.reducer
    ),
    EffectsModule.forFeature([FaqManagerEffects]),
  ],
  providers: [FaqService],
})
export class FaqModule {}
