import { Injectable } from '@angular/core';
import {  ApiSuccessResponse } from '@frontend/common';
import {  Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@frontend/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  public url = '/user/change-password';

  constructor(private http: HttpClient) {}

  private getApiUrl(url: string): string {
    if (url.substring(0, 1) === '/') {
      return `${environment.apiUrl}${url}`;
    } else {
      return `${environment.apiUrl}/${url}`;
    }
  }

  changePassword(password: string): Observable<ApiSuccessResponse> {
    return this.http
      .put<ApiSuccessResponse>(this.getApiUrl(this.url), {password})

  }
}
