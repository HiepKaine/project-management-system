import { Component, ViewContainerRef } from '@angular/core';
import * as ShellActions from '@frontend/shell/shell.actions';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NgxFormManager } from '@ngxform/platform';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';
import { DashBoardService } from './dashboard.service';
@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public profile!: User;
  constructor(
    private store: Store,
    private modal: NzModalService,
    private dashBoardService: DashBoardService,
    private translate: TranslateService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef,
    private notificationService: NotificationService
  ) {
    this.store
      .pipe(
        select(ShellSelectors.getShellProfile),
        filter((data) => data !== undefined),
        untilDestroyed(this)
      )
      .subscribe((data) => {
        this.profile = plainToInstance(User, data);
      });
  }

  openEditUserModal(profile: User) {
    const modal = this.modal.create({
      nzTitle: 'Chỉnh sửa thông tin',
      nzContent: EditUserComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        profile: profile,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            lastName: form.get('lastName')?.value,
            firstName: form.get('firstName')?.value,
            image: form.get('image')?.value[0]?.url ?? null,
            email: form.get('email')?.value,
            phoneNumber: form.get('phoneNumber')?.value,
          };
          this.dashBoardService.updateProfile(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  logout() {
    this.store.dispatch(ShellActions.logoutRequested());
  }
}
