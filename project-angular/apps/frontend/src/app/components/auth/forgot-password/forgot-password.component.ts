import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@project-adngular/shared/frontend/form';
import { AuthService } from '../auth.service';
import { NotificationService } from 'libs/shared/frontend/component/src/lib/notification/notification.service';

@Component({
  selector: 'project-adngular-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotPassForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  @ViewChild('forgot', { static: true })
  forgotFormAnchor!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager,
    // private notificationService: NotificationService,
    // private translate: TranslateService,
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.forgotPassForm, {
      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Email đăng ký tài khoản',
          className: ['ant-col', 'ant-col-xs-24', 'ant-col-sm-24'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.forgotFormAnchor.viewContainerRef);
  }
  onSubmit() {
  //   if (this.forgotPassForm.invalid) {
  //     this.ngxFormManager.markAllAsDirty(this.forgotPassForm);
  //   } else {
  //     this.authService
  //       .forgotPassword(this.forgotPassForm.value.email)
  //       .subscribe(() => {
  //         this.notificationService.success(
  //           this.translate.instant('success.title'),
  //           this.translate.instant(
  //             'Chúng tôi đã gửi email cho bạn, vui lòng kiểm tra và làm theo hướng dẫn trong email'
  //           ),
  //           { nzDuration: 3000 }
  //         );
  //       });
  //   }
  console.log(this.forgotPassForm.value)
  }
}
