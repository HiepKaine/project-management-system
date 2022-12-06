import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiSuccessResponse,
  BaseService,
} from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Review } from '@frontend/models/review.model';
import { TestSession } from '@frontend/models/test-session.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamPackService extends BaseService<ExamPack> {
  public override url = 'exam-pack';

  getRemainingExamTime(
    examPackId: string | number
  ): Observable<ApiCollectionResponse<{ examId: number, remaining: number | null, retry: number }>> {
    return this.http.get<ApiCollectionResponse<{ examId: number, remaining: number | null, retry: number }>>(
      this.getApiUrl(`${this.url}/${examPackId}/remaining-exam-time`)
    );
  }

  getRelatedExamPack(
    examPackId: string | number
  ): Observable<ApiCollectionResponse<ExamPack>> {
    return this.http.get<ApiCollectionResponse<ExamPack>>(
      this.getApiUrl(`${this.url}/${examPackId}/related`)
    );
  }

  userBoughtExamPack(courseId: number): Observable<boolean> {
    return this.http
      .get<ApiItemResponse<{ exist: boolean }>>(
        `${environment.apiUrl}/user/my-exam-pack/${courseId}/check`
      )
      .pipe(
        map((result: ApiItemResponse<{ exist: boolean }>) => result.data.exist)
      );
  }

  getReview(
    examPackId: number,
    param?: { page?: number, limit?: number }
  ): Observable<ApiPaginateResponse<Review>> {
    const params = new HttpParams({ fromObject: { ...param, ...{ limit: 5 } } })
    return this.http.get<ApiPaginateResponse<Review>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/review`, { params }
    );
  }

  getHighlightCourse(
    examPackId: number
  ): Observable<ApiPaginateResponse<Course>> {
    const params = new HttpParams({ fromObject: { limit: 3 } });
    return this.http.get<ApiPaginateResponse<Course>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/highlight`,
      { params }
    );
  }

  addFreeExamPack(examPackId: number): Observable<ApiItemResponse<Course>> {
    return this.http.post<ApiItemResponse<Course>>(
      `${environment.apiUrl}/user/my-exam-pack`,
      { examPackId }
    );
  }

  getTestSession(testSessionId: number): Observable<ApiItemResponse<TestSession>> {
    return this.http.get<ApiItemResponse<TestSession>>(`${environment.apiUrl}/test-session/${testSessionId}`);
  }

  createTestSession(examPackId: number, examId: number): Observable<ApiItemResponse<TestSession>> {
    return this.http.post<ApiItemResponse<TestSession>>(`${environment.apiUrl}/test-session`, { examPackId, examId });
  }

  answer(testSessionId: number, questionId: number, answerId: number): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(`${environment.apiUrl}/test-session/${testSessionId}/answer`, { questionId, answerId });
  }

  complete(testSessionId: number): Observable<ApiItemResponse<TestSession>> {
    return this.http.post<ApiItemResponse<TestSession>>(`${environment.apiUrl}/test-session/${testSessionId}/complete`, {});
  }

  getCurrentTimeInServer(): Observable<ApiItemResponse<{ time: string }>> {
    return this.http.get<ApiItemResponse<{ time: string }>>(`${environment.apiUrl}/test-session/time`);
  }

}
