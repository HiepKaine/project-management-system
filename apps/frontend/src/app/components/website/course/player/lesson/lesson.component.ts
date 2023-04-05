import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnChanges {
  @Input() lesson!: any;
  public src!: SafeUrl;

  constructor(
    protected _sanitizer: DomSanitizer
  ) { }

  ngOnChanges() {
    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(`https://iframe.videodelivery.net/${this.lesson.link}`);
  }
}
