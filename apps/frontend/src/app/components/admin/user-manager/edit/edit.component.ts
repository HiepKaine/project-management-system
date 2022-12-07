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
    phoneNumber: new FormControl(null, [Validators.required]),
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
        this.editUserForm.setValue({
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
        });

        this.ngxFormManager.watch('editUser', this.editUserForm);
        this.ngxFormManager.cast('editUser', {
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
        email: this.editUserForm.get('email')?.value,
        phoneNumber: this.editUserForm.get('phoneNumber')?.value,
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
