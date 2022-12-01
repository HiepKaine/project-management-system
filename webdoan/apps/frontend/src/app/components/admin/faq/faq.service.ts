import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Faq } from '@frontend/models/faq.modal';

@Injectable({
  providedIn: 'root'
})
export class FaqService extends BaseService<Faq>{
  public override url = '/faq'
}
