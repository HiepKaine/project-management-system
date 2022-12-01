import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { UserAvatarComponent } from './user-avatar.component';

@NgModule({
  declarations: [
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    NzAvatarModule
  ],
  exports: [UserAvatarComponent]
})
export class UserAvatarModule { }
