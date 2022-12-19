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
            path: 'faculty',
            loadChildren: () =>
              import('./faculty/faculty.module').then((m) => m.FacultyModule),
          },
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
            path: 'class',
            loadChildren: () =>
              import('./class/class.module').then((m) => m.ClassModule),
          },
          {
            path: 'division',
            loadChildren: () =>
              import('./division/division.module').then(
                (m) => m.DivisionModule
              ),
          },
          {
            path: 'teacher',
            loadChildren: () =>
              import('./teacher/teacher.module').then((m) => m.TeacherModule),
          },
          {
            path: 'subject',
            loadChildren: () =>
              import('./subject/subject.module').then((m) => m.SubjectModule),
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
