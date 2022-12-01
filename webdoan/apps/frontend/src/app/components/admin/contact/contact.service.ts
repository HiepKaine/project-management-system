import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Contact } from '@frontend/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService<Contact> {
  public override url = '/contact';
}
