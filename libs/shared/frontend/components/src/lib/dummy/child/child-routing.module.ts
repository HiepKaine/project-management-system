import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { ChildComponent } from './child.component';

const routes: Routes = [
  {
    path: 'child-component',
    component: ChildComponent,
    data: {
      breadcrumb: 'Child Component'
    }
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
