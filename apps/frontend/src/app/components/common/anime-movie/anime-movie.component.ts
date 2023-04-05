import { Component, Input } from '@angular/core';
import { AnimeMovie } from '@frontend/models/anime-movie.model';

@Component({
  selector: 'app-anime-movie',
  templateUrl: './anime-movie.component.html',
  styleUrls: ['./anime-movie.component.scss'],
})
export class AnimeMovieComponent {
  @Input() item!: AnimeMovie;
  public isHover!: boolean;
}
