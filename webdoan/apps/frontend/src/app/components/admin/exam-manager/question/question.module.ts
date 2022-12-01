import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
  ImportOutline,
  DownloadOutline,
  FileTwoTone,
} from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';

import { CreateMultipleChoiceComponent } from './create-multiple-choice/create-multiple-choice.component';
import { ListComponent } from './list/list.component';
import { QuestionRoutingModule } from './question-routing.module';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
  ImportOutline,
  DownloadOutline,
  FileTwoTone,
];

const NZ_MODULES = [
  NzModalModule,
  NzTableModule,
  NzIconModule.forChild(icons),
  NzButtonModule,
  NzPaginationModule,
  NzFormModule,
  NzInputModule,
  NzModalModule,
  NzBreadCrumbModule,
];

@NgModule({
  declarations: [
    ListComponent,
    CreateMultipleChoiceComponent,
    EditComponent,
    ImportComponent,
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    ...NZ_MODULES,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule.forChild({
      base_url: '/tinymce',
      menubar: 'edit insert format',
      toolbar:
        'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor removeformat',
      height: 250,
    }),
    TranslateModule,
  ],
})
export class QuestionModule {}
