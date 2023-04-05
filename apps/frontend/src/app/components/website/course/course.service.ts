import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCollectionResponse, ApiItemResponse, ApiPaginateResponse, BaseService } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Review } from '@frontend/models/review.model';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor( private http: HttpClient){}

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

}
