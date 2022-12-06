import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserExamComponent } from './user-exam/user-exam.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashBoardService } from './dashboard.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { UserCourseComponent } from './user-course/user-course.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CourseService } from './user-course/course.service';
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
import { CourseItemModule } from '../../common/course-item/course-item.module';
import { ExamPackItemModule } from '../../common/exam-pack-item/exam-pack-item.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamResultFlatModule } from '../../common/exam-result-flat/exam-result-flat.module';
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
    UserExamComponent,
    UserCourseComponent,
    ChangePasswordComponent,
    DashboardComponent,
    EditUserComponent,
    ExamResultComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzPaginationModule,
    NzMenuModule,
    ExamResultFlatModule,
    NzRateModule,
    FormsModule,
    NgxFormModule,
    NzFormModule,
    ReactiveFormsModule,
    CourseItemModule,
    ExamPackItemModule,
    NzModalModule,
    NzAvatarModule,
    NzIconModule.forChild(icons),
  ],
  providers: [DashBoardService, CourseService, ChangePasswordService],
})
export class DashboardModule { }
