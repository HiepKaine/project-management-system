import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOrAdminGuard } from 'apps/frontend/src/app/@core/guard/user-or-admin.guard';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: ':filmId',
    component: DetailComponent,
    canActivate: [UserOrAdminGuard]
  },
  {
    path: '',
    component: DetailComponent,
    canActivate: [UserOrAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailRoutingModule { }
