import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as ShellActions from '@frontend/shell/shell.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { PasswordControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = this.fb.group({
    user: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  @ViewChild('login', { static: true })
  loginFormAnchor!: NgxFormrAnchorComponent;

  constructor(
    private store: Store,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.ngxFormManager.watch('login', this.loginForm);
    this.ngxFormManager.cast('login', {
      user: {
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
    });
  }
  ngOnInit() {
    this.ngxFormManager.render('login', this.loginFormAnchor.viewContainerRef);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.ngxFormManager.markAllAsDirty('login');
    } else {
      const values = this.loginForm.value;
      const isAdmin =
        this.activatedRoute.snapshot.queryParams['type'] === 'admin';
      this.store.dispatch(
        ShellActions.loginRequested({ payload: values, isAdmin })
      );
    }
  }
}
