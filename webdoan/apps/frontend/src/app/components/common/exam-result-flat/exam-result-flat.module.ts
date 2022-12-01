import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResultFlatComponent } from './exam-result-flat.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [ExamResultFlatComponent],
  imports: [CommonModule, NzIconModule],
  exports: [ExamResultFlatComponent],
})
export class ExamResultFlatModule {}
