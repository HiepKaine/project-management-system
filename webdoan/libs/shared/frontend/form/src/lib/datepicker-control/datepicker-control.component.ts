import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { NgxFormManagerComponent } from '@ngxform/platform';

import { DatepickerControlOption } from '../types';

@Component({
  selector: 'webpress-datepicker-control',
  templateUrl: './datepicker-control.component.html',
  styleUrls: ['./datepicker-control.component.scss']
})
export class DatepickerControlComponent extends NgxFormManagerComponent<DatepickerControlOption> implements OnInit {
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
