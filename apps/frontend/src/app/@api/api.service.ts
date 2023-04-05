import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  map,
  Observable,
} from 'rxjs';

import { ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setApiUrl(url: string): void {
    this.apiUrl = url;
  }

  getApiUrl(path: string): string {
    if (path.substring(0, 1) === '/') {
      return `${this.apiUrl}${path}`;
    } else {
      return `${this.apiUrl}/${path}`;
    }
  }

  profile(): Observable<User> {
    return this.http.get<ApiItemResponse<User>>(this.getApiUrl('/profile')).pipe(
      map((result: ApiItemResponse<User>) => result.data)
    )
  }

  updateProfile(
    data: Record<string, unknown>): Observable<User> {
    return this.http.put<ApiItemResponse<User>>(this.getApiUrl('/profile'), data).pipe(map((result: ApiItemResponse<User>) => result.data));
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(this.getApiUrl('/profile/password'), data).pipe(
      map((result: any) => result.data),
      catchError((error) => {
        throw error;
      })
    );
  }
}
