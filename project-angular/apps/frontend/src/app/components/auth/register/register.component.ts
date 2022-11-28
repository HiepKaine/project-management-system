import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import {
  PasswordControlComponent,
  TextControlComponent,
} from '@project-adngular/shared/frontend/form';
import { NotificationService } from 'libs/shared/frontend/component/src/lib/notification/notification.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'project-adngular-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterAccountComponent implements OnInit {
  @ViewChild('anchor', { static: true }) anchor!: NgxFormrAnchorComponent;

  public registerForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(
    private store: Store,
    private fb: FormBuilder,
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
          label: this.translate.get('auth.login.rePasswordLabel'),
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
