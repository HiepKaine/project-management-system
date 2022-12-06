import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { TinymceControlModule } from '@webpress/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { LessonRoutingModule } from './lesson-routing.module';
import { ListComponent } from './list/list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLessonManager from './+state/lesson-manager.reducer';
import { LessonManagerEffects } from './+state/lesson-manager.effects';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  SearchOutline,
  PlaySquareOutline,
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LessonService } from './lesson.service';
import { EditComponent } from './edit/edit.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { PlayerComponent } from './player/player.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

const icons: IconDefinition[] = [
  SearchOutline,
  PlusOutline,
  FormOutline,
  PlaySquareOutline,
  DeleteOutline,
];

@NgModule({
  declarations: [
    CreateLessonComponent,
    ListComponent,
    EditComponent,
    PlayerComponent,
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    TinymceControlModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzBreadCrumbModule,
    YouTubePlayerModule,
    NzIconModule.forChild(icons),
    StoreModule.forFeature(
      fromLessonManager.LESSON_MANAGER_FEATURE_KEY,
      fromLessonManager.reducer
    ),
    EffectsModule.forFeature([LessonManagerEffects]),
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    LessonService,
  ],
})
export class LessonModule {}
