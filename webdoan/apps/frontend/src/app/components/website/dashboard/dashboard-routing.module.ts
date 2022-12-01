import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserCourseComponent } from './user-course/user-course.component';

import { UserExamComponent } from './user-exam/user-exam.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'exam', component: UserExamComponent },
      { path: 'course', component: UserCourseComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      {
        path: 'result',
        loadChildren: () =>
          import('./result/result.module').then((m) => m.ResultModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
