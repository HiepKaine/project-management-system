import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { ListSubjectComponent } from './list-subject/list-subject.component';
import { EditSubjectModalComponent } from './edit-subject-modal/edit-subject-modal.component';
import { CreateSubjectModalComponent } from './create-subject-modal/create-subject-modal.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FormOutline,
  SearchOutline,
  DeleteOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxFormModule } from '@ngxform/platform';

const icons: IconDefinition[] = [
  FormOutline,
  SearchOutline,
  DeleteOutline,
  PlusOutline,
];
@NgModule({
  declarations: [
    ListSubjectComponent,
    EditSubjectModalComponent,
    CreateSubjectModalComponent,
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    NzTableModule,
    NzPaginationModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    FormsModule,
    NgxFormModule,
    ReactiveFormsModule,
    NzIconModule.forChild(icons),
  ],
})
export class SubjectModule {}
