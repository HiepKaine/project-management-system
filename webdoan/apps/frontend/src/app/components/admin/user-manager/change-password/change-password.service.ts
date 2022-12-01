import { Injectable } from '@angular/core';
import { ApiSuccessResponse } from '@frontend/common';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@frontend/env/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  changePassword(
    userId: number,
    password: string
  ): Observable<ApiSuccessResponse> {
    return this.http.put<ApiSuccessResponse>(
      `${environment.apiUrl}/user/${userId}/password`,
      { password }
    );
  }
}
