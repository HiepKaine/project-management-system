import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import {
  TextControlComponent,
  PasswordControlComponent,
} from 'libs/shared/frontend/form/src/index';

@Component({
  selector: 'project-adngular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.fb.group({
    user: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  @ViewChild('login', { static: true })
  loginFormAnchor!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}
  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.loginForm, {
      user: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Email',
          nzPrefixIcon: 'mail',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24', 'p-1'],
        },
      },
      password: {
        component: PasswordControlComponent,
        option: {
          nzSize: 'large',
          type: 'password',
          label: 'Mật khẩu',
          nzPrefixIcon: 'lock',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.loginFormAnchor.viewContainerRef);
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}
