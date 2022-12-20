import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';

import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  PasswordControlComponent,
  TextControlComponent,
} from '@webpress/form';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    phoneNumber: new FormControl(null, [Validators.required]),
    image: new FormControl(''),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      image: {
        component: ImageUploadControlComponent,
        option: {
          NzSize: 'large',
          type: 'image',
          label: 'Ảnh',
          nzMultiple: false,
          queryParamKey: 'files',
          apiEndPoint: `${environment.apiUrl}/file/upload`,
          reponseHandler: (res: ApiCollectionResponse<{ url: string }>) =>
            res.data[0].url,
          className: ['col-12', 'p-1'],
        },
      },
      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Email của bạn:',
          className: ['col-12', 'p-1'],
        },
      },
      password: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          label: 'Mật khẩu của bạn:',
          nzPrefixIcon: 'lock',
          className: ['col-12', 'p-1'],
        },
      },
      phoneNumber: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Số điện thoại:',
          className: ['col-12', 'p-1'],
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
