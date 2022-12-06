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
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
  });
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.init$.next({ user: this.profile });
    this.init$.subscribe((data) => {
      if (data) {
        const imageImputValues: ImageUploadValue[] = [
          {
            uid: '1',
            name: data.user.image,
            status: 'done',
            url: data.user.image,
          },
        ];

        this.form.setValue({
          email: data.user.email,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
          phoneNumber: data.user.phoneNumber,
          image: imageImputValues,
        });

        const ngxform = this.ngxFormManager.init(this.form, {
          firstName: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              label: 'Tên',
              className: ['col-12', 'p-1'],
            },
          },
          lastName: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              label: 'Họ',
              className: ['col-12', 'p-1'],
            },
          },

          image: {
            component: ImageUploadControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Ảnh đại diện',
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
