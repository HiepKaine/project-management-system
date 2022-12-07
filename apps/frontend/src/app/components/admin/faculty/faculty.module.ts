import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateFacultyModalComponent } from './create-faculty-modal/create-faculty-modal.component';
import { EditComponent } from './edit/edit.component';
import { FacultyRoutingModule } from './faculty-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FormOutline,
  SearchOutline,
  DeleteOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [
  SearchOutline,
  FormOutline,
  PlusOutline,
  DeleteOutline,
];
const Nz_MODULE = [
  NzTableModule,
  NzModalModule,
  NzFormModule,
  NzButtonModule,
  NzInputModule,
  NzPaginationModule,
];
@NgModule({
  declarations: [ListComponent, CreateFacultyModalComponent, EditComponent],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    FormsModule,
    NgxFormModule,
    ReactiveFormsModule,
    ...Nz_MODULE,
    NzIconModule.forChild(icons),
  ],
})
export class FacultyModule {}
