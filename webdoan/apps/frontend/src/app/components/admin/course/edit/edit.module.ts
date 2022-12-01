import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';
import { EditCourseLessonComponent } from './edit-course-lesson/edit-course-lesson.component';
import { EditCourseHighlightComponent } from './edit-course-highlight/edit-course-highlight.component';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  AlignRightOutline,
  DeleteOutline,
  DownloadOutline,
  FileTwoTone,
  FormOutline,
  PictureTwoTone,
  PlaySquareOutline,
  PlusOutline,
  SearchOutline,
  UserAddOutline,
  UserDeleteOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AddChapterModalComponent } from './add-chapter-modal/add-chapter-modal.component';
import { AddLessonModalComponent } from './add-lesson-modal/add-lesson-modal.component';
import { EditCourseReviewComponent } from './edit-course-review/edit-course-review.component';
import { AddReviewModalComponent } from './add-review-modal/add-review-modal.component';
import { EditCourseRelatedComponent } from './edit-course-related/edit-course-related.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ListCourseReviewComponent } from '../list/list-course-review/list-course-review.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const icons: IconDefinition[] = [
  UserAddOutline,
  UserDeleteOutline,
  UserOutline,
  AlignRightOutline,
  SearchOutline,
  FormOutline,
  DeleteOutline,
  PlaySquareOutline,
  PlusOutline,
  DownloadOutline,
  FileTwoTone,
  PictureTwoTone,
];

const NZ_MODULES = [
  NzIconModule.forChild(icons),
  NzTableModule,
  NzDropDownModule,
  NzButtonModule,
  NzAlertModule,
  NzModalModule,
  NzFormModule,
  NzGridModule,
  NzUploadModule,
  NzPaginationModule,
  NzRateModule,
  NzBreadCrumbModule,
];

@NgModule({
  declarations: [
    EditComponent,
    EditCourseComponent,
    EditCourseLessonComponent,
    EditCourseHighlightComponent,
    EditCourseRelatedComponent,
    AddChapterModalComponent,
    AddLessonModalComponent,
    EditCourseReviewComponent,
    AddReviewModalComponent,
    ListCourseReviewComponent,
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    NzTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule,
    ...NZ_MODULES,
  ],
})
export class EditModule {}
