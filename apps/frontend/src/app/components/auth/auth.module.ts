import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeInvisibleOutline,
  EyeOutline,
  LockOutline,
  MailOutline,
  PhoneOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NbCheckboxModule, NbIconModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFormModule } from '@ngxform/platform';
import { NotificationModule } from '@shared/components/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FooterModule } from '../common/footer/footer.module';
import { HeaderModule } from '../common/header/header.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterAccountComponent } from './register-account/register-account.component';

const NBMODUES = [NbIconModule, NbCheckboxModule, NzRadioModule,];
const icons: IconDefinition[] = [
  LockOutline,
  PhoneOutline,
  MailOutline,
  EyeOutline,
  EyeInvisibleOutline,
  UserOutline,
];
@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterAccountComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NzSelectModule,
    NotificationModule,
    NgxFormModule,
    ...NBMODUES,
    NzIconModule.forChild(icons),
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    HeaderModule,
    FooterModule
  ],
})
export class AuthModule { }
