import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ProfileService } from './profile.service';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FormOutline,
  DownloadOutline,
  EyeInvisibleOutline,
  FileTwoTone,
  PictureTwoTone,
  PlusOutline,
  LockOutline,
  DeleteOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { ProfileComponent } from './profile.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
const icons: IconDefinition[] = [
  FormOutline,
  DownloadOutline,
  EyeInvisibleOutline,
  FileTwoTone,
  PictureTwoTone,
  PlusOutline,
  DeleteOutline,
  LockOutline,
];
@NgModule({
  declarations: [ProfileComponent, MyAccountComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    NzTableModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NgxFormModule,
    NzModalModule,
    NzBreadCrumbModule,
    NzGridModule,
    NzFormModule,
    NzButtonModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
