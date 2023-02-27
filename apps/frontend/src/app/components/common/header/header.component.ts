import { Component } from '@angular/core';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import * as ShellActions from '@frontend/shell/shell.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isLoggedIn = false;
  public active: boolean = false;
  public show = false;
  public isLogin = true;
  public isSignUp = false;
  public loginForm: UntypedFormGroup = this.fb.group({
    user: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private store: Store,
    private fb: UntypedFormBuilder,
    private translate: TranslateService
  ) {
    this.store
      .select(ShellSelectors.getShellLoggedIn)
      .pipe(untilDestroyed(this))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const values = this.loginForm.value;
    console.log(values);
  }

  isCheck(name: string) {
    if (name === 'login') {
      this.isLogin = true;
      this.isSignUp = false;
    }

    if (name === 'signUp') {
      this.isSignUp = true;
      this.isLogin = false;
    }
  }

  logout() {
    this.store.dispatch(ShellActions.logoutRequested());
  }
}
