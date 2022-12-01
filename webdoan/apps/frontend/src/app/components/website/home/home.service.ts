import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaginateResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';

import { Course } from '@frontend/models/course.model';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCourse(): Observable<ApiPaginateResponse<Course>>
  getCourse(param: { page?: number, type?: number, limit?: number, keyword?: string, isFree?: number| string }): Observable<ApiPaginateResponse<Course>>
  getCourse<T>(param?: T): Observable<ApiPaginateResponse<Course>> {
    const p = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<Course>>(`${environment.apiUrl}/course/active`, { params: p });
  }

  getExamPack(): Observable<ApiPaginateResponse<ExamPack>>
  getExamPack(param: { page?: number, type?: number, limit?: number, keyword?: string, isFree?: number| string }): Observable<ApiPaginateResponse<ExamPack>>
  getExamPack<T>(param?: T): Observable<ApiPaginateResponse<ExamPack>> {
    const p = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<ExamPack>>(`${environment.apiUrl}/exam-pack/active`, { params: p });
  }
}
