import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContactAdminModule } from '../common/contact-admin/contact-admin.module';

import { FaqModule } from '../common/faq/faq.module';
import { FooterModule } from '../common/footer/footer.module';
import { HeaderModule } from '../common/header/header.module';
import { WebsiteRoutingModule } from './website-routing.module';
import { WebsiteComponent } from './website.component';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  UserOutline,
  BulbOutline,
  CloseOutline,
  LockOutline,
} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [
  UserOutline,
  BulbOutline,
  CloseOutline,
  LockOutline,
];
@NgModule({
  declarations: [WebsiteComponent],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    HeaderModule,
    FooterModule,
    FaqModule,
    ContactAdminModule,
    NzIconModule.forChild(icons),
  ],
  providers: [],
})
export class WebsiteModule {}
