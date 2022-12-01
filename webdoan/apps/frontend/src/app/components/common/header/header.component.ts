import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import * as ShellActions from '@frontend/shell/shell.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';

@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public showMenuMobile = false;
  public isLoggedIn = false;
  public profile!: User;

  @ViewChild('toggleBtn') toggleBtn!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  constructor(
    private store: Store,
    private renderer: Renderer2
  ) {

    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.toggleBtn.nativeElement.contains(e.target) && !this.menu.nativeElement.contains(e.target)) {
        this.showMenuMobile = false;
      }
    });


    this.store
      .select(ShellSelectors.getShellLoggedIn)
      .pipe(untilDestroyed(this))
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
      });

    this.store
      .select(ShellSelectors.getShellProfile)
      .pipe(untilDestroyed(this))
      .subscribe((data: User | undefined) => {
        if (data) {
          this.profile = plainToInstance(User, data);
        }
      });
  }

  logout() {
    this.store.dispatch(ShellActions.logoutRequested());
  }
}
