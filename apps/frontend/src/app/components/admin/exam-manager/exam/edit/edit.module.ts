import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  PlusOutline,
  FormOutline,
  EditOutline,
  LinkOutline,
} from '@ant-design/icons-angular/icons';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { CreateRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { EditExamQuestionComponent } from './edit-exam-question/edit-exam-question.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  PlusOutline,
  DeleteOutline,
  FormOutline,
  EditOutline,
  LinkOutline,
];

@NgModule({
  declarations: [EditComponent, EditExamComponent, EditExamQuestionComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    NzTabsModule,
    NzTableModule,
    NzPaginationModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
  ],
})
export class CreateModule {}
