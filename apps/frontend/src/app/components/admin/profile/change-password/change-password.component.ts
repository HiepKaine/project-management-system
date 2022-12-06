import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  NgxFormManager,
  NgxFormrAnchorComponent,
  FormControl,
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { PasswordControlComponent } from '@webpress/form';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: UntypedFormGroup = this.fb.group({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  constructor(
    private fb: UntypedFormBuilder,
    private translate: TranslateService,
    private profileService: ProfileService,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.changePasswordForm, {
      password: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          nzPrefixIcon: 'lock',
          label: 'Mật khẩu mới',
          className: [
            'col-12',
            'ant-col-md-14',
            'ant-col-lg-12',
            'ant-col-xl-10',
          ],
        },
      },
      confirmPassword: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          nzPrefixIcon: 'lock',
          label: 'Xác nhận mật khẩu mới',
          className: [
            'col-12',
            'ant-col-md-14',
            'ant-col-lg-12',
            'ant-col-xl-10',
          ],
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      this.ngxFormManager.markAllAsDirty(this.changePasswordForm);
    } else {
      if (
        this.changePasswordForm.get('password')?.value ===
        this.changePasswordForm.get('confirmPassword')?.value
      ) {
        const password = this.changePasswordForm.get('password')?.value;
        this.profileService.changePassword(password).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.update'),
            { nzDuration: 3000 }
          );
        });
      } else {
        this.notificationService.error(
          this.translate.instant('error.title'),
          this.translate.instant('Bạn cần nhập lại mật khẩu cho trùng khớp'),
          { nzDuration: 3000 }
        );
      }
    }
  }
}
