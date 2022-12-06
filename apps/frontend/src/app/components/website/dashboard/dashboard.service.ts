import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  BaseService,
} from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { environment } from '@frontend/env/environment';
import { User } from '@sentry/types';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService extends BaseService<ExamPack> {
  public override url = '/exam-pack';

  getMyExamPack(): Observable<ApiPaginateResponse<ExamPack>> {
    return this.http.get<ApiPaginateResponse<ExamPack>>(
      this.getApiUrl('/user/my-exam-pack')
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
