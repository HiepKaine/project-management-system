import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { ListTeacherComponent } from './list-teacher/list-teacher.component';
import { CreateTeacherModalComponent } from './create-teacher-modal/create-teacher-modal.component';
import { EditTeacherModalComponent } from './edit-teacher-modal/edit-teacher-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';

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
  ],
})
export class TeacherModule {}
