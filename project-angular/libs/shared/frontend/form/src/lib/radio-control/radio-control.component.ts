import {
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Validators } from '@angular/forms';

import { isObservable } from 'rxjs';

import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';
import { NgxFormManagerComponent } from '@ngxform/platform';

import {
  NzOptionItem,
  RadioControlOption,
} from '../types';

@UntilDestroy()
@Component({
  selector: 'app-select-control',
  templateUrl: './radio-control.component.html',
  styleUrls: ['./radio-control.component.scss']
})
export class RadioControlComponent extends NgxFormManagerComponent<RadioControlOption> implements OnInit {

  @HostBinding('class') className!: string;

  public nzOptions: NzOptionItem[] = [];

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }

  ngOnInit(): void {
    if (this.option && Array.isArray(this.option.nzOptions)) {
      this.nzOptions = this.option.nzOptions;
    } else if (isObservable(this.option.nzOptions)) {
      this.option.nzOptions.pipe(untilDestroyed(this)).subscribe((items: NzOptionItem[]) => {
        Array.isArray(items) && items.length > 0 ? this.nzOptions = items : [];
        if (this.option.onOptionFetched) {
          this.option.onOptionFetched(this.nzOptions);
        }
      })
    } else {
      this.nzOptions = [];
    }

    if (this.option.className) {
      if (Array.isArray(this.option.className)) {
        this.className = this.option.className.join(' ');
      } else {
        this.className = this.option.className;
      }
    }
  }

  onChange(val: any): void {
    this.control.setValue(val);
  }
}
