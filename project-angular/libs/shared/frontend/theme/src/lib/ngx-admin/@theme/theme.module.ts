import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { IconDefinition } from '@ant-design/icons-angular';
import {
  LogoutOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  TranslationOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutService } from '../@core/utils';
import { HeaderComponent } from './components';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import {
  FullWithNotifyLayoutComponent,
} from './layouts/full-width/full-width-notify.layout';
import {
  FullWithLayoutComponent,
} from './layouts/full-width/full-width.layout';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { DARK_THEME } from './styles/theme.dark';
import { DEFAULT_THEME } from './styles/theme.default';

const COMPONENTS = [
  HeaderComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  FullWithLayoutComponent,
  FullWithNotifyLayoutComponent
];
const icons: IconDefinition[] = [TranslationOutline, UserOutline, LogoutOutline, MenuFoldOutline, MenuUnfoldOutline,];
@NgModule({
  declarations: [...COMPONENTS],
  providers: [
    LayoutService,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NbThemeModule.forRoot({
      name: 'default'
    },
      [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME]),
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    TranslateModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzSelectModule,
    NzIconModule.forChild(icons),
  ],
  exports: [...COMPONENTS, NbMenuModule, NbLayoutModule]
})
export class ThemeModule { }
