import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { CourseEffects } from './+state/course.effects';
import * as fromCourse from './+state/course.reducer';
import { CourseRoutingModule } from './course-routing.module';
import { ListComponent } from './list/list.component';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

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
import { NgxFormModule } from '@ngxform/platform';

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
];
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    TranslateModule,
    StoreModule.forFeature(fromCourse.COURSE_FEATURE_KEY, fromCourse.reducer),
    EffectsModule.forFeature([CourseEffects]),
    NgxFormModule,
    ...NZ_MODULES,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class CourseModule {}
