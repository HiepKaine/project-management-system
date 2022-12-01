import { Component } from '@angular/core';
import { ApiCollectionResponse } from '@frontend/common';
import { Faq } from '@frontend/models/faq.modal';
import { plainToInstance } from 'class-transformer';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-faq-modal',
  templateUrl: './faq-modal.component.html',
  styleUrls: ['./faq-modal.component.scss'],
})
export class FaqModalComponent {
  public faqs: Faq[] = [];
  constructor(private faqService: FaqService) {
    this.getFaqs();
  }
  private getFaqs() {
    this.faqService.getFAQ().subscribe((result: ApiCollectionResponse<Faq>) => {
      this.faqs = plainToInstance(Faq, result.data);
    });
  }
}
