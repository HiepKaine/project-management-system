import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: ':id', component: DetailComponent },
  {
    path: ':id/play',
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
