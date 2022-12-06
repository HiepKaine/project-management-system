import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderRoutingModule } from './slider-routing.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SliderService } from './slider.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  DeleteOutline,
  FormOutline,
  PlusOutline,
  DownloadOutline,
  PictureTwoTone,
  PictureOutline,
} from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormModule } from '@ngxform/platform';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CreateSlideModalComponent } from './create-slide-modal/create-slide-modal.component';
import { EditSlideModalComponent } from './edit-slide-modal/edit-slide-modal.component';
import { ListComponent } from './list/list.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
const icons: IconDefinition[] = [
  DeleteOutline,
  DownloadOutline,
  PictureTwoTone,
  FormOutline,
  PlusOutline,
  PictureOutline
];

@NgModule({
  declarations: [
    CreateSlideModalComponent,
    EditSlideModalComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    SliderRoutingModule,
    NzTableModule,
    NzTabsModule,
    NzModalModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFormModule,
    NzFormModule,
    NzAvatarModule,
    NzIconModule.forChild(icons),
  ],
  providers: [SliderService],
})
export class SliderModule {}
