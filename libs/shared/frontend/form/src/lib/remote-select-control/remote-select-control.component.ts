import {
  Component,
  HostBinding,
  OnInit
} from '@angular/core';
import { Validators } from '@angular/forms';
import { isBoolean } from 'lodash-es';

import { isObservable } from 'rxjs';

import {
  UntilDestroy,
  untilDestroyed
} from '@ngneat/until-destroy';
import { NgxFormManagerComponent } from '@ngxform/platform';

import {
  NzOptionItem,
  RemoteSelectControlOption
} from '../types';

@UntilDestroy()
@Component({
  selector: 'app-remote-select-control',
  templateUrl: './remote-select-control.component.html',
  styleUrls: ['./remote-select-control.component.scss'],
})
export class RemoteSelectControlComponent extends NgxFormManagerComponent<RemoteSelectControlOption> implements OnInit {

  @HostBinding('class') className!: string;

  public nzOptions: NzOptionItem[] = [];
  public nzMaxMultipleCount = Infinity;
  public allowClear = false;
  public showSearch = false;

  hasRequiredValidator() {
    return this.control.hasValidator(Validators.required)
  }

  ngOnInit(): void {
    if (this.option.nzMaxMultipleCount) this.nzMaxMultipleCount = this.option.nzMaxMultipleCount;
    if (this.option.allowClear && isBoolean(this.option.allowClear)) this.allowClear = this.option.allowClear;
    if (this.option.showSearch && isBoolean(this.option.showSearch)) this.showSearch = this.option.showSearch;
    if (isObservable(this.option.nzOptions)) {
      this.option.nzOptions
        .pipe(
          untilDestroyed(this)
        )
        .subscribe((items: NzOptionItem[]) => {
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

  onSearch(val: string) {
    if (this.option.onSearch && typeof this.option.onSearch === 'function') {
      this.option.onSearch(val);
    }
  }
}
