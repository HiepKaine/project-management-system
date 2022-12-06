import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Lesson } from '@frontend/models/lesson.model';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() lesson!: Lesson;
  public src!: SafeUrl;

  constructor(
    protected _sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.src = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://iframe.videodelivery.net/${this.lesson.link}`
    );
  }
}
