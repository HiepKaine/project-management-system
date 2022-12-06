import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { UserGuard } from '../../@core/guard/user.guard';

import { WebsiteComponent } from './website.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      { path: 'khoa-hoc', loadChildren: () => import('./course/course.module').then(m => m.CourseModule) },
      { path: 'de-thi', loadChildren: () => import('./exam-pack/exam-pack.module').then(m => m.ExamPackModule) },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [UserGuard]
      },
      { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
