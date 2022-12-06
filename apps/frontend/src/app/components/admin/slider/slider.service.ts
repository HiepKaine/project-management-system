import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiSuccessResponse,
} from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Slide } from '@frontend/models/slide.model';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  constructor(private http: HttpClient) {}

  getSlide(name: string): Observable<ApiCollectionResponse<Slide>> {
    return this.http.get<ApiCollectionResponse<Slide>>(
      `${environment.apiUrl}/slider/${name}`
    );
  }

  addSlide<Slide>(data: Slide): Observable<ApiItemResponse<Slide>> {
    return this.http.post<ApiItemResponse<Slide>>(
      `${environment.apiUrl}/slider`,
      data
    );
  }

  deleteSlide(slideId: number): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/slider/${slideId}`
    );
  }

  updateSlide<Slide>(slideId: number, data: Slide): Observable<Slide> {
    return this.http
      .put<ApiItemResponse<Slide>>(
        `${environment.apiUrl}/slider/${slideId}`,
        data
      )
      .pipe(
        map((result: ApiItemResponse<Slide>) => result.data),
        catchError((error) => {
          throw error;
        })
      );
  }
}
