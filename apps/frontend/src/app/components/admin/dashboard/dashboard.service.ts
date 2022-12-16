import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getReport() {}

  getUserReport() {}
}
