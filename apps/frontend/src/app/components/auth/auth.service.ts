import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable } from 'rxjs';

import { ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from './auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public url = 'auth';

  constructor(private http: HttpClient) {}

  private getApiUrl(url: string): string {
    if (url.substring(0, 1) === '/') {
      return `${environment.apiUrl}${url}`;
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
      .post<ApiItemResponse<User>>(
        this.getApiUrl('/auth/forgot-password'),
        {email: email}
      )
      .pipe(
        map((result: ApiItemResponse<User>) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
