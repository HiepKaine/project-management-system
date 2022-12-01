import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  BookOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  DeleteOutline,
  ExclamationCircleOutline,
  EyeOutline,
  PrinterOutline,
  SnippetsOutline,
  WarningOutline,
} from '@ant-design/icons-angular/icons';
import { NgxPrintElementModule } from 'ngx-print-element';
import { ExamResultFlatModule } from '../../common/exam-result-flat/exam-result-flat.module';
import { UserCardModule } from '../../common/user-card/user-card.module';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TestSessionManagerRoutingModule } from './test-session-manager-routing.module';
import { TestSessionManagerService } from './test-session-manager.service';
import { NzTableModule } from 'ng-zorro-antd/table';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NgxFormModule } from '@ngxform/platform';
import { NzSelectModule } from 'ng-zorro-antd/select';
const icons: IconDefinition[] = [
  EyeOutline,
  DeleteOutline,
  PrinterOutline,
  WarningOutline,
  SnippetsOutline,
  BookOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  ExclamationCircleOutline,
];

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    TestSessionManagerRoutingModule,
    NzPaginationModule,
    NzButtonModule,
    NzModalModule,
    TranslateModule,
    UserCardModule,
    ExamResultFlatModule,
    NgxPrintElementModule,
    NzTableModule,
    NzBreadCrumbModule,
    NgxFormModule,
    NzSelectModule,
    NzIconModule.forChild(icons),
  ],
  providers: [TestSessionManagerService],
})
export class TestSessionManagerModule {}
