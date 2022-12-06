import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';

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

import { CategoryManagerEffects } from './+state/category-manager.effects';
import * as fromCategoryManager from './+state/category-manager.reducer';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryService } from './category.service';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
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
  declarations: [ListComponent, EditComponent, CreateCategoryModalComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    ...NZ_MODULES,
    StoreModule.forFeature(
      fromCategoryManager.CATEGORY_MANAGER_FEATURE_KEY,
      fromCategoryManager.reducer
    ),
    EffectsModule.forFeature([CategoryManagerEffects]),
  ],
  providers: [CategoryService],
})
export class CategoryModule {}
