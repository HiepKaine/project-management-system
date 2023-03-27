import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilmItemComponent } from './film-item.component';

@NgModule({
  declarations: [FilmItemComponent],
  imports: [CommonModule],
  exports: [FilmItemComponent],
})
export class FilmItemModule {}
