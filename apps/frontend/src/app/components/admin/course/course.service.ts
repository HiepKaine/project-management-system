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
import { CourseChapter } from '@frontend/models/course-chapter.model';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Highlight } from '@frontend/models/highlight.model';
import { Related } from '@frontend/models/related.modal';
import { Review } from '@frontend/models/review.model';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  public override url = '/course';

  getActiveExamPack(): Observable<ApiCollectionResponse<ExamPack>>;
  getActiveExamPack(param: {
    keyword: string;
  }): Observable<ApiCollectionResponse<ExamPack>>;
  getActiveExamPack(param?: {
    keyword?: string;
  }): Observable<ApiCollectionResponse<ExamPack>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiCollectionResponse<ExamPack>>(
      this.getApiUrl(`exam-pack/active`),
      { params }
    );
  }

  getActiveCourse(): Observable<ApiPaginateResponse<Course>>;
  getActiveCourse(param: {
    keyword: string;
  }): Observable<ApiPaginateResponse<Course>>;
  getActiveCourse(param?: {
    keyword?: string;
  }): Observable<ApiPaginateResponse<Course>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<Course>>(
      this.getApiUrl(`course/active`),
      { params }
    );
  }

  getLesson(): Observable<ApiCollectionResponse<ExamPack>>;
  getLesson(param: {
    keyword: string;
  }): Observable<ApiCollectionResponse<ExamPack>>;
  getLesson(param?: {
    keyword?: string;
  }): Observable<ApiCollectionResponse<ExamPack>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiCollectionResponse<ExamPack>>(
      this.getApiUrl(`lesson`),
      { params }
    );
  }

  getHighlightExamPacks(
    courseId: number
  ): Observable<ApiPaginateResponse<ExamPack>> {
    const params = new HttpParams({ fromObject: { limit: 3 } });
    return this.http.get<ApiPaginateResponse<ExamPack>>(
      `${environment.apiUrl}/course/${courseId}/highlight`,
      { params }
    );
  }

  removeHighlight(
    courseId: number,
    examPackId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/course/${courseId}/highlight/${examPackId}`
    );
  }

  addHighlight(
    courseId: number,
    examPackId: number
  ): Observable<ApiItemResponse<Highlight>> {
    return this.http.post<ApiItemResponse<Highlight>>(
      `${environment.apiUrl}/course/${courseId}/highlight/`,
      { examPackId }
    );
  }

  addChapter(
    courseId: number,
    data: { name: string }
  ): Observable<ApiItemResponse<CourseChapter>> {
    return this.http.post<ApiItemResponse<CourseChapter>>(
      `${environment.apiUrl}/course/${courseId}/chapter`,
      data
    );
  }

  removeChapter(
    courseId: number,
    chapterId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/course/${courseId}/chapter/${chapterId}`
    );
  }

  addLesson(
    courseId: number,
    chapterId: number,
    lessonId: number
  ): Observable<ApiItemResponse<CourseChapter>> {
    return this.http.post<ApiItemResponse<CourseChapter>>(
      `${environment.apiUrl}/course/${courseId}/chapter/${chapterId}/lesson`,
      { lessonId }
    );
  }

  removeLesson(
    courseId: number,
    chapterId: number,
    lessonId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}`
    );
  }

  getRelated(courseId: number): Observable<ApiPaginateResponse<Course>> {
    const params = new HttpParams({ fromObject: { limit: 4 } });
    return this.http.get<ApiPaginateResponse<Course>>(
      `${environment.apiUrl}/course/${courseId}/related-course`,
      { params }
    );
  }

  removeRelated(
    courseId: number,
    relatedCourseId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/course/${courseId}/related-course/${relatedCourseId}`
    );
  }

  addRelated(
    courseId: number,
    relatedId: number
  ): Observable<ApiItemResponse<Related>> {
    return this.http.post<ApiItemResponse<Related>>(
      `${environment.apiUrl}/course/${courseId}/related-course`,
      { relatedId }
    );
  }

  getReview(courseId: number): Observable<ApiPaginateResponse<Review>> {
    return this.http.get<ApiPaginateResponse<Review>>(
      `${environment.apiUrl}/course/${courseId}/review`
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
