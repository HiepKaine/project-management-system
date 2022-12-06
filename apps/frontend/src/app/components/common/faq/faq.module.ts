import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconDefinition } from '@ant-design/icons-angular';
import { MinusOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FaqComponent } from './faq.component';
import { FaqService } from './faq.service';
import { FaqModalComponent } from './faq-modal/faq-modal.component';

const icons: IconDefinition[] = [PlusOutline, MinusOutline];

@NgModule({
  declarations: [FaqComponent, FaqModalComponent],
  imports: [
    CommonModule,
    NzCollapseModule,
    NzButtonModule,
    NzModalModule,
    NzIconModule.forChild(icons)
  ],
  exports: [FaqComponent],
  providers: [FaqService],
})
export class FaqModule { }
