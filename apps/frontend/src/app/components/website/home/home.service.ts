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
  constructor(private http: HttpClient) {}
}
