import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDivisionComponent } from './list-division/list-division.component';

const routes: Routes = [
  {
    path: '',
    component: ListDivisionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionRoutingModule {}
