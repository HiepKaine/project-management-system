import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { User } from '@frontend/models/user.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  ImageUploadValue,
  TextControlComponent,
} from '@webpress/form';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  @Input() profile!: User;
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public init$: BehaviorSubject<{ user: User } | undefined> =
    new BehaviorSubject<{ user: User } | undefined>(undefined);

  public form: UntypedFormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required]),
  });
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.init$.next({ user: this.profile });
    this.init$.subscribe((data) => {
      if (data) {
        this.form.setValue({
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
        });

        const ngxform = this.ngxFormManager.init(this.form, {
          email: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Email:',
              className: ['col-12', 'p-1'],
            },
          },
          phoneNumber: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Số điện thoại:',
              className: ['col-12', 'p-1'],
            },
          },
        });
        this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
      }
    });
  }
}
