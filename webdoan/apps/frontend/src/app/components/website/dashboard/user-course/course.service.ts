import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPaginateResponse, BaseService } from '@frontend/common';
import { Course } from '@frontend/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends BaseService<Course> {
  public override url = '/exam-pack';

  getMyCourse(): Observable<ApiPaginateResponse<Course>> {
    return this.http.get<ApiPaginateResponse<Course>>(
      this.getApiUrl('/user/my-course')
    );
  }
}
