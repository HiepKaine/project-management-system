import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [
  { path: '', component: ListStudentComponent },
  { path: ':id/detail', component: DetailStudentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
