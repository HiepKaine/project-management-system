import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { DetailComponent } from './detail/detail.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { IconDefinition } from '@ant-design/icons-angular';
import { LockOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { ContactFormModule } from '../../common/contact-form/contact-form.module';
const icons: IconDefinition[] = [LockOutline, UserOutline];

@NgModule({
  declarations: [ DetailComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzRateModule,
    FormsModule,
    NzCarouselModule,
    NzAnchorModule,
    NzCollapseModule,
    YouTubePlayerModule,
    NzAvatarModule,
    ContactFormModule,
    NzModalModule,
    NzIconModule.forChild(icons),
  ],
})
export class CourseModule { }
