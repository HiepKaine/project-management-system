import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedFilm',
  pure: false
})
export class CompletedFilmPipe implements PipeTransform {

  transform(value: any[], film: any): boolean {
    return value.some(item => item.filmId === film.id);
  }

}
