import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { FilmComponent } from './film/film.component';
import { DetailComponent } from './detail.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlayCircleOutline}  from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [
  PlayCircleOutline
]
@NgModule({
  declarations: [FilmComponent, DetailComponent],
  imports: [CommonModule, DetailRoutingModule, NzIconModule.forChild(icons)],
})
export class DetailModule {}
