import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'libs/shared/frontend/common/src/environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { LoginRequest, LoginResponse, RegisterRequest, User } from './auth.type';
import { ApiItemResponse } from 'libs/shared/frontend/common/src/lib/http/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'auth';
  constructor(private http: HttpClient) {}

  private getApiUrl(url: string): string {
    if (url.substring(0, 1) === '/') {
      return `${environment}${url}`;
    } else {
      return `${environment.apiUrl}/${url}`;
    }
  }

  login(params: LoginRequest): Observable<ApiItemResponse<LoginResponse>> {
    return this.http.post<ApiItemResponse<LoginResponse>>(
      this.getApiUrl('/auth/login'),
      params
    );
  }

  register(
    params: RegisterRequest
  ): Observable<ApiItemResponse<LoginResponse>> {
    return this.http.post<ApiItemResponse<LoginResponse>>(
      this.getApiUrl('/auth/register'),
      params
    );
  }

  forgotPassword(email: string): Observable<User> {
    return this.http
      .post<ApiItemResponse<User>>(this.getApiUrl('/auth/forgot-password'), {
        email: email,
      })
      .pipe(
        map((result: ApiItemResponse<User>) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
