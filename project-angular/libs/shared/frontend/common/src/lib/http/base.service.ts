import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {
  ApiCollectionResponse,
  ApiItemResponse,
  ApiPaginateResponse,
  ApiSuccessResponse,
} from './types';

@Injectable()
export class BaseService<T> {
  public url!: string;
  public model!: T;

  constructor(public http: HttpClient) { }

  getApiUrl(url: string) {
    if (url.substring(0, 1) === '/') {
      return `${environment.apiUrl}${url}`;
    } else {
      return `${environment.apiUrl}/${url}`;
    }
  }

  /**
   * Get list of all resource with pagination
   *
   * @param param Optinal
   *
   * @return Observable
   */
  get(params?: Record<string, boolean | number | string | number>): Observable<ApiPaginateResponse<T>> {
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiPaginateResponse<T>>(this.getApiUrl(this.url), {
      params: queryParams,
    });
  }

  getAll(params?: Record<string, string | number>): Observable<ApiCollectionResponse<T>> {
    const queryParams = new HttpParams({ fromObject: params });
    return this.http
      .get<ApiCollectionResponse<T>>(this.getApiUrl(this.url), {
        params: queryParams,
      })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  /**
   * Get list of all resource
   *
   * @param params Optional
   *
   * @return Observable
   */
  list(params?: Record<string, string | number>): Observable<ApiCollectionResponse<T>> {
    return this.http
      .post<ApiCollectionResponse<T>>(this.getApiUrl(`${this.url}/all`), params)
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }

  all(params?: Record<string, string | number>): Observable<T[]> {
    return this.http
      .get<ApiCollectionResponse<T>>(this.getApiUrl(`${this.url}`), params)
      .pipe(map((result: ApiCollectionResponse<T>) => result.data));
  }

  /**
   * Update resource by given id
   *
   * @param Object
   *
   * @return Observable
   */
  update<DTO>(id: string | number, data: DTO): Observable<T> {
    return this.http.put<ApiItemResponse<T>>(this.getApiUrl(this.url) + '/' + id, data).pipe(
      map((result: ApiItemResponse<T>) => result.data),
      catchError((error) => {
        throw error;
      })
    );
  }

  /**
   * Delete resource by given id
   *
   * @param id
   *
   * @return Observable
   */
  delete(id: string | number): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(this.getApiUrl(this.url) + '/' + id).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }


  create<DTO>(data: DTO): Observable<ApiItemResponse<T>> {
    return this.http.post<ApiItemResponse<T>>(this.getApiUrl(this.url), data);
  }

  show(id: number | string, params?: Record<string, string | number | boolean>): Observable<ApiItemResponse<T>> {
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get<ApiItemResponse<T>>(this.getApiUrl(`${this.url}/${id}`), { params: queryParams });
  }
}
