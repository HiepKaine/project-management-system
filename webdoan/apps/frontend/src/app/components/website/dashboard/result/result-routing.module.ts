import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamResultComponent } from '../exam-result/exam-result.component';
import { ResultComponent } from './result.component';

const routes: Routes = [
  { path: '', component: ResultComponent },
  { path: ':id', component: ExamResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultRoutingModule {}
