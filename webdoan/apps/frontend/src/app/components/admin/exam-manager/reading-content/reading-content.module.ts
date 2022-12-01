import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

import { TranslateModule } from '@ngx-translate/core';
import { TinymceControlModule } from '@webpress/form';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ReadingContentRoutingModule } from './reading-content-routing.module';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline, LinkOutline, PlusOutline,
  SearchOutline
} from '@ant-design/icons-angular/icons';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
  LinkOutline,
];

@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    ReadingContentRoutingModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule,
    NzFormModule,
    NzInputModule,
    TranslateModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
  ],
})
export class ReadingContentModule {}
