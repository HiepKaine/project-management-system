import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubjectComponent } from './list-subject/list-subject.component';

const routes: Routes = [{ path: '', component: ListSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
