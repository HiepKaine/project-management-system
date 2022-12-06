import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewManagerRoutingModule } from './review-manager-routing.module';
import { ListComponent } from './list/list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FormOutline,
  SearchOutline,
  FileTwoTone,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { TinymceControlModule } from '@webpress/form';

const icons: IconDefinition[] = [
  SearchOutline,
  FormOutline,
  PlusOutline,
  FileTwoTone,
  DeleteOutline,
  DownloadOutline,
];

const Nz_MODULE = [
  NzTableModule,
  NzModalModule,
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzPaginationModule,
  NzRateModule,
  TinymceControlModule,
];
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ReviewManagerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    ...Nz_MODULE,
    NzIconModule.forChild(icons),
  ],
})
export class ReviewManagerModule {}
