import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
})
export class FilmComponent {
  @Input() film!: any;
  public src!: SafeUrl;

  constructor(protected _sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://iframe.videodelivery.net/${this.film.link}`
      );
  }
}
