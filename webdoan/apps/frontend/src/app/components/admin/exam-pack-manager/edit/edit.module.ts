import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { TinymceControlModule } from '@webpress/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { EditExamPackHighlightComponent } from './edit-exam-pack-highlight/edit-exam-pack-highlight.component';
import { EditExamPackExamComponent } from './edit-exam-pack-exam/edit-exam-pack-exam.component';
import { EditExamPackComponent } from './edit-exam-pack/edit-exam-pack.component';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

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
import { AddExamModalComponent } from './add-exam-modal/add-exam-modal.component';
import { EditExamPackRelatedComponent } from './edit-exam-pack-related/edit-exam-pack-related.component';
import { EditExamPackReviewComponent } from './edit-exam-pack-review/edit-exam-pack-review.component';
import { AddExamPackReviewComponent } from './add-exam-pack-review/add-exam-pack-review.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ListExamPackReviewComponent } from '../list/list-exam-pack-review/list-exam-pack-review.component';
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
    EditExamPackComponent,
    EditExamPackExamComponent,
    EditExamPackHighlightComponent,
    AddExamModalComponent,
    EditExamPackRelatedComponent,
    EditExamPackReviewComponent,
    AddExamPackReviewComponent,
    ListExamPackReviewComponent,
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
