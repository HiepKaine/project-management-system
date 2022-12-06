import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AuthComponent } from './auth.component';
import {
  ForgotPasswordComponent,
} from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import {
  RegisterAccountComponent,
} from './register-account/register-account.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordComponent
      },
      {
        path: 'register',
        component: RegisterAccountComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
