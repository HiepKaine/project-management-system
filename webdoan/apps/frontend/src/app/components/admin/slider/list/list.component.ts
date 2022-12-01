import { Component, ViewContainerRef } from '@angular/core';
import { ApiCollectionResponse } from '@frontend/common';
import { Slide } from '@frontend/models/slide.model';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { plainToInstance } from 'class-transformer';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateSlideModalComponent } from '../create-slide-modal/create-slide-modal.component';
import { EditSlideModalComponent } from '../edit-slide-modal/edit-slide-modal.component';
import { SliderService } from '../slider.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  public nameSlide!: string;
  public slides: Slide[] = [];

  constructor(
    private modal: NzModalService,
    private translate: TranslateService,
    private sliderService: SliderService,
    private ngxFormManager: NgxFormManager,
    private viewContainerRef: ViewContainerRef,
    private notificationService: NotificationService
  ) {
    this.getSlide('header');
  }

  getSlide(name: string) {
    this.nameSlide = name;
    this.sliderService
      .getSlide(name)
      .subscribe((result: ApiCollectionResponse<Slide>) => {
        this.slides = plainToInstance(Slide, result.data);
      });
  }

  openModalAddSlide() {
    const modal = this.modal.create({
      nzTitle: 'Thêm Slide',
      nzContent: CreateSlideModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {},
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const imageUrl = form.get('image')?.value[0]?.url ?? null;
          const data = {
            image: imageUrl,
            name: form.get('name')?.value,
            alt: form.get('alt')?.value,
            order: form.get('order')?.value,
            url: form.get('url')?.value ?? '#',
          };
          this.sliderService.addSlide(data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            modal.destroy();
            this.getSlide(this.nameSlide);
          });
        }
        return false;
      },
    });
  }

  openModalEditSlide(slide: Slide) {
    const modal = this.modal.create({
      nzTitle: 'Chỉnh sửa slide',
      nzContent: EditSlideModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        slide: slide,
      },
      nzOnOk: () => {
        const form = modal.getContentComponent().form;
        if (form.invalid) {
          this.ngxFormManager.markAllAsDirty(form);
        } else {
          const data = {
            image: form.get('image')?.value[0]?.url ?? null,
            name: form.get('name')?.value,
            alt: form.get('alt')?.value,
            order: form.get('order')?.value,
            url: form.get('url')?.value ?? '#',
          };
          this.sliderService.updateSlide(slide.id, data).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
            this.getSlide(this.nameSlide);
            modal.destroy();
          });
        }
        return false;
      },
    });
  }

  deleteSlide(item: Slide) {
    const modal = this.modal.warning({
      nzTitle: 'Xóa slide',
      nzContent: `Bạn có chắc chắn muốn xoá ảnh <b>${item.alt}</b>`,
      nzOnOk: () => {
        this.sliderService.deleteSlide(item.id).subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.create'),
            { nzDuration: 3000 }
          );
          modal.destroy();
          this.getSlide(this.nameSlide);
        });
      },
    });
  }
}
