import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiItemResponse,
  ApiPaginateResponse,
  ApiSuccessResponse,
  BaseService,
} from '@frontend/common';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { UserActivity } from '@frontend/models/user-activity.model';
import { Ip } from '@frontend/models/ip.model';
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

  getUserExamPack(
    userId: number,
    param?: { page?: number }
  ): Observable<ApiPaginateResponse<ExamPack>> {
    const queryParam = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<ExamPack>>(
      this.getApiUrl(`${this.url}/${userId}/exam-pack`),
      { params: queryParam }
    );
  }

  removeExamPack(
    userId: number,
    examPackId: number
  ): Observable<ApiPaginateResponse<ExamPack>> {
    return this.http.delete<ApiPaginateResponse<ExamPack>>(
      this.getApiUrl(`${this.url}/${userId}/exam-pack/${examPackId}`)
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

  getUserCourse(
    userId: number,
    param?: { page?: number }
  ): Observable<ApiPaginateResponse<Course>> {
    const queryParam = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<Course>>(
      this.getApiUrl(`${this.url}/${userId}/course`),
      { params: queryParam }
    );
  }

  removeUserCourse(
    userId: number,
    courseId: number
  ): Observable<ApiPaginateResponse<Course>> {
    return this.http.delete<ApiPaginateResponse<Course>>(
      this.getApiUrl(`${this.url}/${userId}/course/${courseId}`)
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

  getUserIp(
    userId: number,
    param?: { page?: number }
  ): Observable<ApiPaginateResponse<Ip>> {
    const params = new HttpParams({ fromObject: { limit: 4 } });
    return this.http.get<ApiPaginateResponse<Ip>>(
      this.getApiUrl(`/user-activity/${userId}/ip`),
      { params }
    );
  }

  getUserActivity(
    userId: number,
    param?: { page?: number }
  ): Observable<ApiPaginateResponse<UserActivity>> {
    const params = new HttpParams({ fromObject: { limit: 4 } });
    return this.http.get<ApiPaginateResponse<UserActivity>>(
      this.getApiUrl(`/user-activity/${userId}/activity`),
      { params }
    );
  }

  deleteUserIp(userId: number, ipId: number): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      this.getApiUrl(`/user-activity/${userId}/ip/${ipId}`)
    );
  }
}
