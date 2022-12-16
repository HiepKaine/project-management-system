import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { User } from '@frontend/models/user.model';

import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';

import { ImageUploadControlComponent, ImageUploadValue } from '@webpress/form';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  @Input() admin!: User;
  public form: UntypedFormGroup = this.fb.group({
    image: new FormControl(''),
  });

  public init$: BehaviorSubject<{ admin: User } | undefined> =
    new BehaviorSubject<{ admin: User } | undefined>(undefined);
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) { }

  ngOnInit(): void {
    this.init$.next({ admin: this.admin });
    this.init$.subscribe((data) => {
      if (data) {

        const ngxform = this.ngxFormManager.init(this.form, {
        });
        this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
      }
    });
  }
}
