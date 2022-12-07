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
            path: 'option',
            loadChildren: () =>
              import('./option/option.module').then((m) => m.OptionModule),
          },
          {
            path: 'course',
            loadChildren: () =>
              import('./course/course.module').then((m) => m.CourseModule),
          },
          {
            path: 'category',
            loadChildren: () =>
              import('./category/category.module').then(
                (m) => m.CategoryModule
              ),
          },
          {
            path: 'exam-manager',
            loadChildren: () =>
              import('./exam-manager/exam-manager.module').then(
                (m) => m.ExamManagerModule
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
            path: 'test-session-manager',
            loadChildren: () =>
              import('./test-session-manager/test-session-manager.module').then(
                (m) => m.TestSessionManagerModule
              ),
          },
          {
            path: 'lesson',
            loadChildren: () =>
              import('./lesson/lesson.module').then((m) => m.LessonModule),
          },
          {
            path: 'contact',
            loadChildren: () =>
              import('./contact/contact.module').then((m) => m.ContactModule),
          },
          {
            path: 'user',
            loadChildren: () =>
              import('./user-manager/user-manager.module').then(
                (m) => m.UserManagerModule
              ),
          },
          {
            path: 'faq',
            loadChildren: () =>
              import('./faq/faq.module').then((m) => m.FaqModule),
          },
          {
            path: 'review-manager',
            loadChildren: () =>
              import('./review-manager/review-manager.module').then(
                (m) => m.ReviewManagerModule
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
