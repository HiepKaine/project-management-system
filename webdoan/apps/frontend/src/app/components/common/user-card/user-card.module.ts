import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from './user-card.component';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  PlaySquareFill,
  FileExcelFill,
  ApiFill,
  ProfileFill,
  EditFill,
  
} from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';

const icons: IconDefinition[] = [
  EditFill,
  PlaySquareFill,
  FileExcelFill,
  ApiFill,
  ProfileFill,
];

@NgModule({
  declarations: [UserCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
  ],
  exports: [UserCardComponent],
})
export class UserCardModule {}
