import { RouterModule } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconDefinition } from '@ant-design/icons-angular';
import { UserOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [UserOutline];
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    NzDropDownModule,
    NzIconModule,
    RouterModule,
    NzIconModule.forChild(icons),
    NzAvatarModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
