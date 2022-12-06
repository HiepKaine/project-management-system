import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaginateResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { TestSession } from '@frontend/models/test-session.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ResultService {
  constructor(private http: HttpClient) { }

  getListExam(): Observable<ApiPaginateResponse<TestSession>> {
    return this.http.get<ApiPaginateResponse<TestSession>>(
      `${environment.apiUrl}/test-session/my-test-session`
    );
  }
}
