import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamPackItemComponent } from './exam-pack-item.component';
import { FormsModule } from '@angular/forms';
import { NzRateModule } from 'ng-zorro-antd/rate';

const NZ_MODULES = [NzRateModule];

@NgModule({
  declarations: [ExamPackItemComponent],
  imports: [CommonModule, FormsModule, ...NZ_MODULES],
  exports: [ExamPackItemComponent],
})
export class ExamPackItemModule {}
