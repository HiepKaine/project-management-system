import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseItemComponent } from './course-item.component';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';

const NZ_MODULES = [NzRateModule];

@NgModule({
  declarations: [CourseItemComponent],
  imports: [CommonModule, FormsModule, ...NZ_MODULES],
  exports: [CourseItemComponent],
})
export class CourseItemModule {}
