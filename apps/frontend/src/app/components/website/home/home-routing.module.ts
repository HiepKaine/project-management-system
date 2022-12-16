import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'khoa-on-cong-chuc', component: HomeComponent },
  { path: 'khoa-on-vien-chuc', component: HomeComponent },
  { path: 'phong-thi-trac-nghiem-online', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
