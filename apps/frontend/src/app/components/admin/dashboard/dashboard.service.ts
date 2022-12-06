import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getReport(): Observable<
    ApiItemResponse<{
      userCount: number;
      courseCount: number;
      questionCount: number;
    }>
  > {
    return this.http.get<
      ApiItemResponse<{
        userCount: number;
        courseCount: number;
        questionCount: number;
      }>
    >(`${environment.apiUrl}/analytic/report`);
  }

  getUserReport(param?: {
    type?: string;
    from?: string;
  }): Observable<ApiCollectionResponse<{ label: Date; value: number }>> {
    const params = new HttpParams({ fromObject: param });
    return this.http.get<ApiCollectionResponse<{ label: Date; value: number }>>(
      `${environment.apiUrl}/analytic/report/user`,
      { params }
    );
  }
}
