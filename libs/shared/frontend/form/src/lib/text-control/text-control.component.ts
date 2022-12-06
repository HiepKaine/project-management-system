import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { isObservable } from 'rxjs';

import { NgxFormManagerComponent } from '@ngxform/platform';

import { TextControlOption } from '../types';

@Component({
  selector: 'webpress-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss']
})
export class TextControlComponent extends NgxFormManagerComponent<TextControlOption> implements OnInit {
  @HostBinding('class') className!: string;

  public label!: string;
  public type = 'text';

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }

  ngOnInit(): void {
    if (this.option.type) {
      this.type = this.option.type;
    }

    if (this.option.label) {
      if (isObservable(this.option.label)) {
        this.option.label.subscribe((data: any) => {
          if (data) this.label = data;
        })
      } else {
        this.label = this.option.label;
      }
    }

    if (this.option.className) {
      if (Array.isArray(this.option.className)) {
        this.className = this.option.className.join(' ');
      } else {
        this.className = this.option.className;
      }
    }
  }
}
