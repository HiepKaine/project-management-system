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
  selector: 'app-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss']
})
export class PasswordControlComponent extends NgxFormManagerComponent<TextControlOption> implements OnInit {
  @HostBinding('class') className!: string;

  public label!: string;
  public passwordVisible = false;

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }

  ngOnInit(): void {

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
