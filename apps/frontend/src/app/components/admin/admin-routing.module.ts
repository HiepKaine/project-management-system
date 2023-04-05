import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../@core/guard/admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('./profile/profile.module').then((m) => m.ProfileModule),
          },
          {
            path: 'dashboard',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
          {
            path: 'exam-pack-manager',
            loadChildren: () =>
              import('./exam-pack-manager/exam-pack-manager.module').then(
                (m) => m.ExamPackManagerModule
              ),
          },
          {
            path: 'user',
            loadChildren: () =>
              import('./user-manager/user-manager.module').then(
                (m) => m.UserManagerModule
              ),
          },
          { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
        ],
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
