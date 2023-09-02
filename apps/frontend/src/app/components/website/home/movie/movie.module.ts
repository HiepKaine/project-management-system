import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { DetailComponent } from './detail/detail.component';
import { FilmComponent } from './detail/film/film.component';

@NgModule({
  declarations: [ DetailComponent, FilmComponent],
  imports: [CommonModule, MovieRoutingModule],
})
export class MovieModule {}
