import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

import * as ShellActions from '@frontend/shell/shell.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { PasswordControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss'],
})
export class RegisterAccountComponent implements OnInit {
  @ViewChild('anchor', { static: true }) anchor!: NgxFormrAnchorComponent;

  public registerForm: UntypedFormGroup = this.fb.group({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private store: Store,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
    this.ngxFormManager.watch('registerForm', this.registerForm);
    this.ngxFormManager.cast('registerForm', {
      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: this.translate.get('auth.login.loginUserLabel'),
          nzPrefixIcon: 'mail',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24', 'p-1'],
        },
      },
      password: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          label: this.translate.get('auth.login.passwordLabel'),
          nzPrefixIcon: 'lock',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24', 'p-1'],
        },
      },
      re_password: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          label: 'Nhập lại mật khẩu của bạn',
          nzPrefixIcon: 'lock',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24', 'p-1'],
        },
      },
    });
  }

  ngOnInit() {
    this.ngxFormManager.render('registerForm', this.anchor.viewContainerRef);
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.ngxFormManager.markAllAsDirty('registerForm');
    } else {
      if (
        this.registerForm.get('password')?.value ===
        this.registerForm.get('re_password')?.value
      ) {
        this.store.dispatch(
          ShellActions.registerRequested({ payload: this.registerForm.value })
        );
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
