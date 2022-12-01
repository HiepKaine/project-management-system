import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxFormModule } from '@ngxform/platform';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { ReadingContentQuestionComponent } from './reading-content-question/reading-content-question.component';
import { EditReadingContentComponent } from './edit-reading-content/edit-reading-content.component';
import { EditComponent } from './edit.component';
import { TinymceControlModule } from '@webpress/form';
import { CreateReadingContentQuestionModalComponent } from './create-reading-content-question-modal/create-reading-content-question-modal.component';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EditReadingContentQuestionModalComponent } from './edit-reading-content-question-modal/edit-reading-content-question-modal.component';

const icons: IconDefinition[] = [
  FormOutline,
  PlusOutline,
  DeleteOutline,
];
@NgModule({
  declarations: [
    EditComponent,
    ReadingContentQuestionComponent,
    EditReadingContentComponent,
    CreateReadingContentQuestionModalComponent,
    EditReadingContentQuestionModalComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    NzTabsModule,
    NzBreadCrumbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    NzFormModule,
    NzButtonModule,
    TinymceControlModule,
    NzPaginationModule,
    NzTableModule,
    NzIconModule.forChild(icons),
  ],
})
export class EditModule { }
