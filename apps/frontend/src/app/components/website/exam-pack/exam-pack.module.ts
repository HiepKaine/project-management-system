import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamPackRoutingModule } from './exam-pack-routing.module';
import { DetailComponent } from './detail/detail.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { QuestionComponent } from './question/question.component';
import { ReadingQuestionComponent } from './reading-question/reading-question.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { LockOutline } from '@ant-design/icons-angular/icons';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { ExamPackItemModule } from '../../common/exam-pack-item/exam-pack-item.module';
import { CourseItemModule } from '../../common/course-item/course-item.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ContactFormModule } from '../../common/contact-form/contact-form.module';

const icons: IconDefinition[] = [LockOutline];
@NgModule({
  declarations: [DetailComponent, QuestionComponent, ReadingQuestionComponent],
  imports: [
    CommonModule,
    ExamPackRoutingModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzPaginationModule,
    NzButtonModule,
    NzRateModule,
    FormsModule,
    NzCarouselModule,
    NzAnchorModule,
    YouTubePlayerModule,
    NzAvatarModule,
    ExamPackItemModule,
    CourseItemModule,
    ContactFormModule,
    NzModalModule,
    NzIconModule.forChild(icons),
  ],
})
export class ExamPackModule { }
