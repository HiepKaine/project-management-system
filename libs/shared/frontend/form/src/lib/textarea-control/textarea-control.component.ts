import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { NgxFormManagerComponent } from '@ngxform/platform';

import { TextareaControlOption } from '../types';

@Component({
  selector: 'webpress-textarea-control',
  templateUrl: './textarea-control.component.html',
  styleUrls: ['./textarea-control.component.scss']
})
export class TextareaControlComponent extends NgxFormManagerComponent<TextareaControlOption> implements OnInit {
  @HostBinding('class') className!: string;

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }

  ngOnInit(): void {
    if (this.option.className) {
      if (Array.isArray(this.option.className)) {
        this.className = this.option.className.join(' ');
      } else {
        this.className = this.option.className;
      }
    }
  }
}
