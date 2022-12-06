import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NgxFormModule } from '@ngxform/platform';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { CourseItemModule } from '../../../common/course-item/course-item.module';
import { ExamPackItemModule } from '../../../common/exam-pack-item/exam-pack-item.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

const NZ_MODULES = [
  NzCarouselModule,
  NzPaginationModule,
  NzRateModule,
  NzModalModule,
  NzButtonModule,
  NzFormModule,
  NzTabsModule,
  NzSelectModule,
];

@NgModule({
  declarations: [ SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    CourseItemModule,
    ExamPackItemModule,
    NzBreadCrumbModule,
    NgxFormModule,
    ...NZ_MODULES,
  ],
})
export class SearchModule { }
