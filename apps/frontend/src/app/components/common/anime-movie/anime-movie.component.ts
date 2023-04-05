import { Component, Input, OnInit } from '@angular/core';
import { AnimeMovie } from '@frontend/models/anime-movie.model';

@Component({
  selector: 'app-anime-movie',
  templateUrl: './anime-movie.component.html',
  styleUrls: ['./anime-movie.component.scss'],
})
export class AnimeMovieComponent implements OnInit {
  @Input() item!: AnimeMovie;
  @Input() type!: string;
  public isHover!: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  checkType(): string {
    let result = ''
    if (this.isHover){
      if (this.type === 'film-random') {
        result = 'hover-2';
      } else {
        result = 'hover';
      }
    }
    return result;
  }
}
