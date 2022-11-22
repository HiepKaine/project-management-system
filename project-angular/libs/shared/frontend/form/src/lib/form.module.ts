import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  EyeInvisibleOutline,
  EyeOutline,
  PlusOutline,
} from '@ant-design/icons-angular/icons';
import { TranslateModule } from '@ngx-translate/core';
import { EditorModule } from '@tinymce/tinymce-angular';

import { DatepickerControlComponent } from './datepicker-control/datepicker-control.component';
import { ImageUploadControlComponent } from './image-upload-control/image-upload-control.component';
import { PasswordControlComponent } from './password-control/password-control.component';
import { RadioControlComponent } from './radio-control/radio-control.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { TextControlComponent } from './text-control/text-control.component';
import { TextareaControlComponent } from './textarea-control/textarea-control.component';
import { TinymceControlModule } from './tinymce-control/tinymce-control.module';
import { RemoteSelectControlComponent } from './remote-select-control/remote-select-control.component';

const icons: IconDefinition[] = [PlusOutline, EyeOutline, EyeInvisibleOutline];
@NgModule({
  imports: [
    CommonModule,
    TinymceControlModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NzIconModule.forChild(icons),
    NzFormModule,
    TranslateModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzGridModule,
    NzUploadModule,
    NzModalModule,
    NzRadioModule,
  ],
  declarations: [
    TextControlComponent,
    DatepickerControlComponent,
    SelectControlComponent,
    TextareaControlComponent,
    ImageUploadControlComponent,
    RadioControlComponent,
    PasswordControlComponent,
    RemoteSelectControlComponent,
  ],
})
export class WebpressFormControlModule {}
