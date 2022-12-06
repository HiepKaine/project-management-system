import { Component, ViewContainerRef } from '@angular/core';
import { ApiItemResponse } from '@frontend/common';
import { User } from '@frontend/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MyAccountComponent } from './my-account/my-account.component';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  public admin!: User;
  constructor(
    private profileService: ProfileService,
    private modal: NzModalService,
    private translate: TranslateService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef,
    private notificationService: NotificationService
  ) {
    this.getProfile();
  }
  private getProfile() {
    this.profileService
      .getProfile()
      .subscribe((result: ApiItemResponse<User>) => {
        this.admin = result.data;
      });
  }

  openModalEditAdmin(admin: User) {
    const modal = this.modal.create({
      nzTitle: 'Chỉnh sửa ảnh',
      nzContent: MyAccountComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        admin: admin,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            image: form.get('image')?.value[0]?.url ?? null,
          };
          this.profileService.updateProfile(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            this.getProfile();
            modal.destroy();
          });
        }
        return false;
      },
    });
  }
}
