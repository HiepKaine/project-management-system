import { FaqModalComponent } from './faq-modal/faq-modal.component';
import { Component, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  public constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  showModal(): void {
    const modal = this.modal.create({
      nzTitle: 'Hỗ trợ học viên',
      nzContent: FaqModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWrapClassName: 'faq-modal',
      nzFooter: null,
      nzOnOk: () => {
        modal.destroy();
      },
    });
  }
}
