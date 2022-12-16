import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { CreateTeacherModalComponent } from './create-teacher-modal/create-teacher-modal.component';
import { EditTeacherModalComponent } from './edit-teacher-modal/edit-teacher-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@NgModule({
  declarations: [
    ListTeacherComponent,
    CreateTeacherModalComponent,
    EditTeacherModalComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzPaginationModule,
  ],
})
export class TeacherModule {}
