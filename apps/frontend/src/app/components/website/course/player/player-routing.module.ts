import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOrAdminGuard } from '../../../../@core/guard/user-or-admin.guard';
import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    path: ':lessonId',
    component: PlayerComponent,
    canActivate: [UserOrAdminGuard]
  },
  {
    path: '',
    component: PlayerComponent,
    canActivate: [UserOrAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
