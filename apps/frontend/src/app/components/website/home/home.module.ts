import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  CloseCircleOutline, MinusOutline, PlusOutline,
  QuestionCircleFill
} from '@ant-design/icons-angular/icons';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContactFormModule } from '../../common/contact-form/contact-form.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NgxFormModule } from '@ngxform/platform';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { FilmItemModule } from '../../common/film-item/film-item.module';
import { CollectionItemModule } from '../../common/collection-item/collection-item.module';
import { AnimeMovieModule } from '../../common/anime-movie/anime-movie.module';
const icons: IconDefinition[] = [
  QuestionCircleFill,
  CloseCircleOutline,
  PlusOutline,
  MinusOutline,
];

const NZ_MODULES = [
  NzCarouselModule,
  NzPaginationModule,
  NzRateModule,
  NzModalModule,
  NzButtonModule,
  NzFormModule,
  NzTabsModule,
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NzBreadCrumbModule,
    ContactFormModule,
    NgxFormModule,
    ...NZ_MODULES,
    NzIconModule.forChild(icons),
    FilmItemModule,
    CollectionItemModule,
    AnimeMovieModule,
  ],
  providers: [HomeService],
})
export class HomeModule { }
