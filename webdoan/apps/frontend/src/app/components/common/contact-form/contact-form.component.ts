import { NzModalService } from 'ng-zorro-antd/modal';
import { ContactFormModalComponent } from './contact-form-modal/contact-form-modal.component';
import { Component, Input, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  @Input() btnText!: string;
  @Input() type!: number;
  @Input() content!: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService
  ) { }

  showModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Bạn muốn có được những thành công như trên không? Đăng ký và liên hệ ngay với chúng tôi để được tư vấn.',
      nzContent: ContactFormModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        type: this.type,
        content: this.content,
      },
      nzWrapClassName: 'contact-form-modal',
      nzFooter: null,
      nzOnOk: () => {
        modal.destroy();
      },
    });
  }
}
