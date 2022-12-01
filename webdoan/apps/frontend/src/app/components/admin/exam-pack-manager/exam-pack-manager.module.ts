import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ExamPackManagerRoutingModule } from './exam-pack-manager-routing.module';
import { ExamPackManagerService } from './exam-pack-manager.service';
import { ListComponent } from './list/list.component';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlaySquareOutline,
  PlusOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFormModule } from '@ngxform/platform';

const icons: IconDefinition[] = [
  PlusOutline,
  DeleteOutline,
  FormOutline,
  PlaySquareOutline,
  SearchOutline,
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ExamPackManagerRoutingModule,
    TranslateModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    NzAlertModule,
    NzModalModule,
    NgxFormModule,
    NzIconModule.forChild(icons),
  ],
  providers: [ExamPackManagerService],
})
export class ExamPackManagerModule {}
