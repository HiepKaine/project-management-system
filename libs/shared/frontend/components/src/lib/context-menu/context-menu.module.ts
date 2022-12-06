import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  exports: [
    ContextMenuComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NzDropDownModule,
    NzIconModule
  ]
})
export class ContextMenuModule { }
