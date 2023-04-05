import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AnimeMovieComponent } from './anime-movie.component';

@NgModule({
  declarations: [AnimeMovieComponent],
  imports: [CommonModule],
  exports: [AnimeMovieComponent],
})
export class AnimeMovieModule {}
