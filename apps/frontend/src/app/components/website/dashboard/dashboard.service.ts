import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  BaseService,
} from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {
  constructor(private http: HttpClient) {}

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
