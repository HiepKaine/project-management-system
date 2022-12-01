import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [CreateComponent, CreateCourseComponent],
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
    NzBreadCrumbModule,
  ],
})
export class CreateModule {}
