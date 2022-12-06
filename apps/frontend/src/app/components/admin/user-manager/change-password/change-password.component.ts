import { ChangePasswordService } from './change-password.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { PasswordControlComponent } from 'libs/shared/frontend/form/src/lib/password-control/password-control.component';
import { ActivatedRoute } from '@angular/router';
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
    private ngxFormManager: NgxFormManager,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private changePasswordService: ChangePasswordService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.ngxFormManager.watch('changePasswordForm', this.changePasswordForm);
    this.ngxFormManager.cast('changePasswordForm', {
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
            'p-1',
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
            'p-1',
          ],
        },
      },
    });
    this.ngxFormManager.render(
      'changePasswordForm',
      this.formInputs.viewContainerRef
    );
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
        this.changePasswordService
          .changePassword(
            this.activatedRoute.snapshot.params['id'],
            password
          )
          .subscribe(() => {
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
