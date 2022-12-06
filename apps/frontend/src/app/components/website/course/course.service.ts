import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCollectionResponse, ApiItemResponse, ApiPaginateResponse, BaseService } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { CompletedLesson } from '@frontend/models/completed-lesson.model';
import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Review } from '@frontend/models/review.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService extends BaseService<Course> {
  public override url = '/course';

  getActiveCourse(params?: Record<string, string | number>): Observable<ApiPaginateResponse<Course>> {
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiPaginateResponse<Course>>(this.getApiUrl(`${this.url}/active`), { params: queryParams });
  }

  addFreeCourse(courseId: number): Observable<ApiItemResponse<Course>> {
    return this.http.post<ApiItemResponse<Course>>(`${environment.apiUrl}/user/my-course`, { courseId })
  }

  getRelatedCourse(courseId: string | number): Observable<ApiCollectionResponse<Course>> {
    return this.http.get<ApiCollectionResponse<Course>>(this.getApiUrl(`${this.url}/${courseId}/related-course`));
  }

  getHighlightExamPacks(courseId: number): Observable<ApiPaginateResponse<ExamPack>> {
    return this.http.get<ApiPaginateResponse<ExamPack>>(`${environment.apiUrl}/course/${courseId}/highlight`)
  }

  userBoughtCourse(courseId: number): Observable<boolean> {
    return this.http.get<ApiItemResponse<{ exist: boolean }>>(`${environment.apiUrl}/user/my-course/${courseId}/check`)
      .pipe(
        map((result: ApiItemResponse<{ exist: boolean }>) => result.data.exist)
      )
  }

  getReview(
    courseId: number,
    param?: { page?: number, limit?: number }
  ): Observable<ApiPaginateResponse<Review>> {
    const params = new HttpParams({
      fromObject: { ...param, ...{ limit: 5 } }
    });
    return this.http.get<ApiPaginateResponse<Review>>(
      `${environment.apiUrl}/course/${courseId}/review`,
      { params }
    );
  }

  checkCompletedStatusOfCourse(
    coureId: number,
  ): Observable<ApiCollectionResponse<CompletedLesson>> {
    return this.http.get<ApiCollectionResponse<CompletedLesson>>(`${environment.apiUrl}/completed-lesson/check-course-completed/${coureId}`);
  }

  checkCompletedStatusOfChapter(
    courseChapterId: number,
  ): Observable<ApiCollectionResponse<CompletedLesson>> {
    return this.http.get<ApiCollectionResponse<CompletedLesson>>(`${environment.apiUrl}/completed-lesson/check-chapter-completed/${courseChapterId}`);
  }

  checkCompletedLessonStatus(
    courseChapterId: number,
    lessonId: number
  ): Observable<ApiItemResponse<{ isCompleted: boolean }>> {
    return this.http.get<ApiItemResponse<{ isCompleted: boolean }>>(`${environment.apiUrl}/completed-lesson/check/${courseChapterId}/${lessonId}`);
  }
  completedLesson(
    courseChapterId: number,
    lessonId: number
  ): Observable<ApiItemResponse<CompletedLesson>> {
    return this.http.post<ApiItemResponse<CompletedLesson>>(`${environment.apiUrl}/completed-lesson`, { courseChapterId, lessonId });
  }

}
