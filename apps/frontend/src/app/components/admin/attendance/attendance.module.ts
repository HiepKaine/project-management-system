import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { ListAttendanceComponent } from './list-attendance/list-attendance.component';
import { EditAttendanceModalComponent } from './edit-attendance-modal/edit-attendance-modal.component';
import { CreateAttendanceModalComponent } from './create-attendance-modal/create-attendance-modal.component';
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
    ListAttendanceComponent,
    EditAttendanceModalComponent,
    CreateAttendanceModalComponent,
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
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
export class AttendanceModule {}
