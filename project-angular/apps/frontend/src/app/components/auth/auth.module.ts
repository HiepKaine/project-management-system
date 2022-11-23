import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  MailOutline,
  PhoneOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from '@ngx-translate/core';
const icons: IconDefinition[] = [
  LockOutline,
  PhoneOutline,
  MailOutline,
  EyeOutline,
  EyeInvisibleOutline,
  UserOutline,
];
@NgModule({
  declarations: [AuthComponent, LoginComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormModule,
    TranslateModule,
    NzIconModule.forChild(icons),
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzRadioModule,
  ],
})
export class AuthModule {}
