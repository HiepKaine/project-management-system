import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { HomeComponent } from './home.component';
import { DetailComponent } from './movie/detail/detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'detail',
    loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
