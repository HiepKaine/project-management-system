import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { AuthOrGuestGuard } from './@core/guard/AuthOrGuest.guard';

import { MasterComponent } from './master.component';


const routes: Routes =
  [
    {
      path: '',
      component: MasterComponent,
      children: [
        {
          path: 'auth',
          loadChildren: () =>
            import('./components/auth/auth.module').then((m) => m.AuthModule),
        },
        {
          path: 'admin',
          loadChildren: () =>
            import('./components/admin/admin.module').then((m) => m.AdminModule),
        },
        {
          path: '',
          loadChildren: () =>
            import('./components/website/website.module').then((m) => m.WebsiteModule),
          canActivate: [AuthOrGuestGuard]
        },
      ],
    },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
