import { Injectable } from '@angular/core';
import {
  ApiItemResponse,
  ApiSuccessResponse,
  BaseService,
} from '@frontend/common';
import { User } from '@frontend/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<User> {
  public override url = '/user';

  changeUserStatus(
    userId: number,
    status: boolean
  ): Observable<ApiItemResponse<User>> {
    return this.http.put<ApiItemResponse<User>>(
      this.getApiUrl(`${this.url}/${userId}/status`),
      { status }
    );
  }


  addUserExamPack(
    userId: number,
    examPackId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      this.getApiUrl(`${this.url}/${userId}/exam-pack`),
      { examPackId }
    );
  }

  addUserCourse(
    userId: number,
    courseId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      this.getApiUrl(`${this.url}/${userId}/course`),
      { courseId }
    );
  }

  deleteUserIp(userId: number, ipId: number): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      this.getApiUrl(`/user-activity/${userId}/ip/${ipId}`)
    );
  }
}
