import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreRoutingModule } from './score-routing.module';
import { ListScoreComponent } from './list-score/list-score.component';
import { EditScoreModalComponent } from './edit-score-modal/edit-score-modal.component';
import { CreateScoreModalComponent } from './create-score-modal/create-score-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  FormOutline,
  SearchOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
  PictureTwoTone,
  FileTwoTone,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
const icons: IconDefinition[] = [
  SearchOutline,
  FormOutline,
  PlusOutline,
  DeleteOutline,
  DownloadOutline,
  PictureTwoTone,
  FileTwoTone,
];

@NgModule({
  declarations: [
    ListScoreComponent,
    EditScoreModalComponent,
    CreateScoreModalComponent,
  ],
  imports: [
    CommonModule,
    ScoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzFormModule,
    NzPaginationModule,
    NzModalModule,
    NzIconModule.forChild(icons),
  ],
})
export class ScoreModule {}
