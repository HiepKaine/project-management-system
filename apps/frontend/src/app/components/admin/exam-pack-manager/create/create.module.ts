import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import { PlusOutline, DeleteOutline } from '@ant-design/icons-angular/icons';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateExamPackComponent } from './create-exam-pack/create-exam-pack.component';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [PlusOutline, DeleteOutline];

@NgModule({
  declarations: [CreateComponent, CreateExamPackComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    NzTabsModule,
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
