import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline
} from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';

import { ExamManagerRoutingModule } from './exam-manager-routing.module';
import { QuestionService } from './question/question.service';
import { ExamManagerService } from './service/exam-manager.service';
import { ReadingContentService } from './service/reading-content.service';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
];

const NZ_MODULES = [
  NzModalModule,
  NzTableModule,
  NzIconModule.forChild(icons),
  NzButtonModule,
  NzPaginationModule,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExamManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...NZ_MODULES,
  ],
  providers: [QuestionService, ExamManagerService, ReadingContentService],
})
export class ExamManagerModule { }
