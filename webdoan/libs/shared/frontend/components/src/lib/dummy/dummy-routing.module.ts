import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DummyComponent } from './dummy.component';

const routes: Routes = [
  { path: '', redirectTo: 'child/child-component', pathMatch: 'full' },
  {
    path: 'dummy',
    component: DummyComponent,
    data: {
      breadcrumb: 'Dummy'
    }
  },
  {
    path: 'child',
    loadChildren: () => import('./child/child.module').then(m => m.ChildModule),
    data: {
      breadcrumb: 'Parent Component'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyRoutingModule { }
