import { CommonModule } from '@angular/common';
import {
  InjectionToken,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TranslateModule } from '@ngx-translate/core';
import {
  EditorModule,
  TINYMCE_SCRIPT_SRC,
} from '@tinymce/tinymce-angular';

import { TinymceControlComponent } from './tinymce-control.component';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TinymceControlConfig extends Record<string, any> { }

export const TinymceControlConfigService = new InjectionToken<TinymceControlConfig>("TinymceControlConfig");

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NzFormModule,
    NzInputModule,
    TranslateModule
  ],
  declarations: [
    TinymceControlComponent
  ],
  exports: [
    TinymceControlComponent
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    { provide: TinymceControlConfigService, useValue: undefined }
  ]
})
export class TinymceControlModule {
  static forChild(config: TinymceControlConfig): ModuleWithProviders<TinymceControlModule> {
    return {
      ngModule: TinymceControlModule,
      providers: [
        { provide: TinymceControlConfigService, useValue: config }
      ]
    };
  }
}


