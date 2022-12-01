import { catchError, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiSuccessResponse,
  BaseService,
} from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { environment } from '@frontend/env/environment';
import { Exam } from '@frontend/models/exam.model';
import { HttpParams } from '@angular/common/http';
import { Course } from '@frontend/models/course.model';
import { Highlight } from '@frontend/models/highlight.model';
import { Related } from '@frontend/models/related.modal';
import { Review } from '@frontend/models/review.model';
import { Dictionary } from '@frontend/models/dictionary.model';

@Injectable({
  providedIn: 'root',
})
export class ExamPackManagerService extends BaseService<ExamPack> {
  public override url = '/exam-pack';

  getActiveCourse(): Observable<ApiCollectionResponse<Course>>;
  getActiveCourse(param: {
    keyword: string;
  }): Observable<ApiCollectionResponse<Course>>;
  getActiveCourse(param?: {
    keyword?: string;
  }): Observable<ApiCollectionResponse<Course>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiCollectionResponse<Course>>(
      this.getApiUrl(`course/active`),
      { params }
    );
  }

  getActiveExamPack(): Observable<ApiPaginateResponse<ExamPack>>;
  getActiveExamPack(param: {
    keyword: string;
  }): Observable<ApiPaginateResponse<ExamPack>>;
  getActiveExamPack(param?: {
    keyword?: string;
  }): Observable<ApiPaginateResponse<ExamPack>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<ExamPack>>(
      this.getApiUrl(`exam-pack/active`),
      { params }
    );
  }

  getExam(): Observable<ApiCollectionResponse<Exam>>;
  getExam(param: { keyword: string }): Observable<ApiCollectionResponse<Exam>>;
  getExam(param?: {
    keyword?: string;
  }): Observable<ApiCollectionResponse<Exam>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiCollectionResponse<Exam>>(
      `${environment.apiUrl}/exam`,
      { params }
    );
  }

  addExam(examPackId: number, examId: number): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      `${environment.apiUrl}/exam-pack/${examPackId}/exam`,
      { examId }
    );
  }

  removeExam(
    examPackId: number,
    examId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/exam-pack/${examPackId}/exam/${examId}`
    );
  }

  getHighlight(examPackId: number): Observable<ApiPaginateResponse<Course>> {
    const params = new HttpParams({ fromObject: { limit: 3 } });
    return this.http.get<ApiPaginateResponse<Course>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/highlight`,
      { params }
    );
  }

  removeHighlight(
    examPackId: number,
    courseId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/exam-pack/${examPackId}/highlight/${courseId}`
    );
  }

  addHighlight(
    examPackId: number,
    courseId: number
  ): Observable<ApiItemResponse<Highlight>> {
    return this.http.post<ApiItemResponse<Highlight>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/highlight/`,
      { courseId }
    );
  }

  getRelated(examPackId: number): Observable<ApiPaginateResponse<ExamPack>> {
    const params = new HttpParams({ fromObject: { limit: 4 } });
    return this.http.get<ApiPaginateResponse<ExamPack>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/related`,
      { params }
    );
  }

  removeRelated(
    examPackId: number,
    relatedExamPackId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/exam-pack/${examPackId}/related/${relatedExamPackId}`
    );
  }

  addRelated(
    examPackId: number,
    relatedId: number
  ): Observable<ApiItemResponse<Related>> {
    return this.http.post<ApiItemResponse<Related>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/related`,
      { examPackId: relatedId }
    );
  }

  getReview(examPackId: number): Observable<ApiPaginateResponse<Review>> {
    return this.http.get<ApiPaginateResponse<Review>>(
      `${environment.apiUrl}/exam-pack/${examPackId}/review`,
    );
  }

  deleteReview(reviewId: number): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/review/${reviewId}`
    );
  }

  addReview<Review>(data: Review): Observable<ApiItemResponse<Review>> {
    return this.http.post<ApiItemResponse<Review>>(
      `${environment.apiUrl}/review/`,
      data
    );
  }

  updateReview<Review>(reviewId: number, data: Review): Observable<Review> {
    return this.http
      .put<ApiItemResponse<Review>>(
        `${environment.apiUrl}/review/${reviewId}`,
        data
      )
      .pipe(
        map((result: ApiItemResponse<Review>) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
