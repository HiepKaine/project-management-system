import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiItemResponse, ApiSuccessResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { User } from '@frontend/models/user.model';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<ApiItemResponse<User>> {
    return this.http.get<ApiItemResponse<User>>(
      `${environment.apiUrl}/profile`
    );
  }

  changePassword(password: string): Observable<ApiSuccessResponse> {
    return this.http.put<ApiSuccessResponse>(
      `${environment.apiUrl}/user/change-password`,
      {
        password,
      }
    );
  }

  updateProfile<User>(data: User): Observable<User> {
    return this.http
      .put<ApiItemResponse<User>>(`${environment.apiUrl}/profile/`, data)
      .pipe(
        map((result: ApiItemResponse<User>) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
