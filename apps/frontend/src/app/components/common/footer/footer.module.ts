import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  CopyrightOutline,
  FacebookFill,
  YoutubeFill,
  LinkedinFill,
  InstagramFill,
} from '@ant-design/icons-angular/icons';
import { FormsModule } from '@angular/forms';
const icons: IconDefinition[] = [
  CopyrightOutline,
  FacebookFill,
  YoutubeFill,
  LinkedinFill,
  InstagramFill,
];
@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    NzIconModule.forChild(icons),
    FormsModule,
  ],
  exports: [FooterComponent],
})
export class FooterModule {}
