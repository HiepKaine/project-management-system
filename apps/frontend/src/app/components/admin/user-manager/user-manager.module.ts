import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  LockOutline,
  PlaySquareOutline,
  PlusOutline,
  SearchOutline,
  SettingOutline,
  DownloadOutline,
  SnippetsOutline,
  BookOutline,
  EyeInvisibleOutline,
  ExportOutline,
  FileTwoTone,
  PictureTwoTone,
  PlaySquareFill,
  FileExcelFill,
  ApiFill,
  ProfileFill,
  EditFill,
  FlagFill,
} from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';
import { NgxFormModule } from '@ngxform/platform';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserCourseComponent } from './user-course/user-course.component';
import { UserExamPackComponent } from './user-exam-pack/user-exam-pack.component';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { UserCardModule } from '../../common/user-card/user-card.module';
import { AddUserCourseModalComponent } from './add-user-course-modal/add-user-course-modal.component';
import { AddUserExamPackModalComponent } from './add-user-exam-pack-modal/add-user-exam-pack-modal.component';
import { UserIpComponent } from './user-ip/user-ip.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { UserActivityComponent } from './user-activity/user-activity.component';
const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  DeleteOutline,
  PlaySquareOutline,
  SettingOutline,
  DownloadOutline,
  SnippetsOutline,
  BookOutline,
  LockOutline,
  EyeInvisibleOutline,
  ExportOutline,
  FileTwoTone,
  FlagFill,
  PictureTwoTone,
  PlaySquareFill,
  FileExcelFill,
  ApiFill,
  ProfileFill,
  EditFill,
];

@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    CreateUserModalComponent,
    ChangePasswordComponent,
    UserCourseComponent,
    UserExamPackComponent,
    AddUserCourseModalComponent,
    AddUserExamPackModalComponent,
    UserIpComponent,
    UserActivityComponent,
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    NzSelectModule,
    NzTableModule,
    NzSwitchModule,
    FormsModule,
    NzIconModule,
    NzDropDownModule,
    NzPaginationModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzModalModule,
    NgxFormModule,
    NzAlertModule,
    TranslateModule,
    UserCardModule,
    NzBreadCrumbModule,
    NzIconModule.forChild(icons),
  ],
})
export class UserManagerModule { }
