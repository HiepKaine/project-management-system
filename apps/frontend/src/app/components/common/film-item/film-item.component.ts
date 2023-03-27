import { Component, Input, OnInit } from '@angular/core';
import { FilmItem } from '@frontend/models/film-item.model';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent implements OnInit {
  @Input() item!: FilmItem;
  public isHover: boolean = false;

  ngOnInit() {
  }

}
