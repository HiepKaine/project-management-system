import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCollectionResponse, BaseService } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Faq } from '@frontend/models/faq.modal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  constructor(private http: HttpClient) {}

  getFAQ(): Observable<ApiCollectionResponse<Faq>> {
    return this.http.get<ApiCollectionResponse<Faq>>(
      `${environment.apiUrl}/faq`
    );
  }
}
