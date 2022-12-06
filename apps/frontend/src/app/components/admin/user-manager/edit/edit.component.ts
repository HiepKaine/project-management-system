import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';

import { BehaviorSubject } from 'rxjs';

import { environment } from '@frontend/env/environment';

import { Dictionary } from '@frontend/models/dictionary.model';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import {
  ImageUploadControlComponent,
  ImageUploadValue,
  TextControlComponent,
} from '@webpress/form';

import { UserService } from '../user.service';
import { ApiCollectionResponse } from '@frontend/common';
import { User } from '@frontend/models/user.model';

export interface EditUserState {
  user: User;
}

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public userId!: number;
  public user!: User;
  public dictionary!: Dictionary;
  public init$: BehaviorSubject<{ user: User } | undefined> =
    new BehaviorSubject<{ user: User } | undefined>(undefined);

  public editUserForm: UntypedFormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
    position: new FormControl(null),
    organization: new FormControl(null),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.userId = Number(this.activatedRoute.snapshot.params['id']);

    this.userService
      .show(this.userId)
      .pipe(untilDestroyed(this))
      .subscribe((result) => {
        if (result) {
          this.user = plainToInstance(User, result.data);
          this.init$.next({ user: this.user });
        }
      });
  }

  ngOnInit(): void {
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

        this.editUserForm.setValue({
          email: data.user.email,
          lastName: data.user.lastName,
          firstName: data.user.firstName,
          phoneNumber: data.user.phoneNumber,
          position: data.user.position,
          organization: data.user.organization,
          image: imageImputValues,
        });

        this.ngxFormManager.watch('editUser', this.editUserForm);
        this.ngxFormManager.cast('editUser', {
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
          position: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Vị trí ứng tuyển:',
              className: ['col-12', 'p-1'],
            },
          },
          organization: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Cơ quan ứng tuyển:',
              className: ['col-12', 'p-1'],
            },
          },
        });
        this.ngxFormManager.render(
          'editUser',
          this.formInputs.viewContainerRef
        );
      }
    });
  }

  onSubmit() {
    if (this.editUserForm.invalid) {
      this.ngxFormManager.markAllAsDirty(this.editUserForm);
    } else {
      const imageUrl = this.editUserForm.get('image')?.value[0]?.url ?? null;
      const data = {
        lastName: this.editUserForm.get('lastName')?.value,
        firstName: this.editUserForm.get('firstName')?.value,
        email: this.editUserForm.get('email')?.value,
        phoneNumber: this.editUserForm.get('phoneNumber')?.value,
        position: this.editUserForm.get('position')?.value,
        organization: this.editUserForm.get('organization')?.value,
        image: imageUrl,
      };
      this.userService.update(this.userId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    }
  }
}
