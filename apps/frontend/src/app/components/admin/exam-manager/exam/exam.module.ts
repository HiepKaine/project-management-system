import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
  LinkOutline,
} from '@ant-design/icons-angular/icons';
import { ExamRoutingModule } from './exam-routing.module';
import { ListComponent } from './list/list.component';
import { NgxFormModule } from '@ngxform/platform';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
  LinkOutline,
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    NzPaginationModule,
    NzTableModule,
    NzButtonModule,
    NgxFormModule,
    NzIconModule.forChild(icons),
  ],
})
export class ExamModule {}
