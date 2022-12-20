import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserIpComponent } from './user-ip/user-ip.component';
import { UserActivityComponent } from './user-activity/user-activity.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: ':id/edit', component: EditComponent },
  { path: ':id/change-password', component: ChangePasswordComponent },
  { path: ':id/user-ip', component: UserIpComponent },
  { path: ':id/user-activity', component: UserActivityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
