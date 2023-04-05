import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardService } from './dashboard.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard.component';
import { ChangePasswordService } from './change-password/change-password.service';
import { NgxFormModule } from '@ngxform/platform';
import { NzFormModule } from 'ng-zorro-antd/form';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeFill,
  DeleteOutline,
  DownloadOutline,
  FileTwoTone,
  PictureTwoTone,
  LockOutline,
  EyeInvisibleOutline,
  UserOutline
} from '@ant-design/icons-angular/icons';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
const icons: IconDefinition[] = [
  EyeFill,
  DeleteOutline,
  DownloadOutline,
  FileTwoTone,
  PictureTwoTone,
  LockOutline,
  EyeInvisibleOutline,
  UserOutline
];

@NgModule({
  declarations: [
    ChangePasswordComponent,
    DashboardComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzPaginationModule,
    NzMenuModule,
    NzRateModule,
    FormsModule,
    NgxFormModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule,
    NzAvatarModule,
    NzIconModule.forChild(icons),
  ],
  providers: [DashBoardService, ChangePasswordService],
})
export class DashboardModule { }
