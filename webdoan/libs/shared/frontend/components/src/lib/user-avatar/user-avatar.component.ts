import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { NzShapeSCType } from 'ng-zorro-antd/core/types';

import {
  NzSize,
  UserAvatarTheme,
} from './user-avatar.const';

@Component({
  selector: 'user-avatar',
  template: `
  <div class="avatar" [ngClass]="theme">
    <div class="avatar__image">
      <nz-avatar
        [ngStyle]="{ 'background-color': bgColor, 'color': textColor }"
        [nzIcon]="nzIcon"
        [nzShape]="nzShape"
        [nzSize]="nzSize"
        [nzGap]="nzGap"
        [nzSrc]="nzSrc"
        [nzSrcSet]="nzSrcSet"
        [nzAlt]="nzAlt"
        [nzText]="nzText"
        ></nz-avatar>
      </div>
    <div class="avatar__name">
      <p *ngIf="user">{{user}}</p>
      <small *ngIf="title">{{title}}</small>
    </div>
  </div>
  `,
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent implements OnChanges {
  @Input() nzIcon!: string;
  @Input() nzShape!: NzShapeSCType;
  @Input() nzSize: NzSize = 50;
  @Input() nzGap = 4;
  @Input() nzSrc!: string;
  @Input() nzSrcSet!: string;
  @Input() nzAlt!: string;
  @Input() nzText!: string;
  @Input() user!: string;
  @Input() title!: string;
  @Input() theme!: UserAvatarTheme;
  @Input() bgColor!: string;
  @Input() textColor!: string;

  constructor() {
    this.init()
  }

  init(): void {
    const bgColorDefault = ['#00a2ae', '#f56a00'];
    const textColorDefault = ['#fff', '#fff'];
    if (!this.bgColor || bgColorDefault.includes(this.bgColor)) {
      this.bgColor = this.theme === 'light' ? bgColorDefault[0] : bgColorDefault[1];
    }
    if (!this.textColor || textColorDefault.includes(this.textColor)) {
      this.textColor = this.theme === 'light' ? textColorDefault[0] : textColorDefault[1];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.theme) {
      this.init();
    }
  }
}
