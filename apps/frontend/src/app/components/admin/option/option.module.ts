import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
  PictureTwoTone,
  FileTwoTone,
  DownloadOutline,
} from '@ant-design/icons-angular/icons';

import { NgxFormModule } from '@ngxform/platform';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OptionManagerEffects } from './+state/option-manager.effects';
import * as fromOptionManager from './+state/option-manager.reducer';
import { OptionRoutingModule } from './option-routing.module';
import { OptionService } from './option.service';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
  PictureTwoTone,
  FileTwoTone,
  DownloadOutline,
];

const NZ_MODULES = [
  NzButtonModule,
  NzInputModule,
  NzTableModule,
  NzFormModule,
  NzModalModule,
  NzUploadModule,
  NzBreadCrumbModule,
  NzIconModule.forChild(icons),
];
@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    OptionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    ...NZ_MODULES,
    StoreModule.forFeature(
      fromOptionManager.OPTION_MANAGER_FEATURE_KEY,
      fromOptionManager.reducer
    ),
    EffectsModule.forFeature([OptionManagerEffects]),
  ],
  providers: [OptionService],
})
export class OptionModule {}
