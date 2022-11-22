import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import {
  catchError,
  switchMap,
} from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient, private router: Router) { }

  isUploadFileRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('upload') || request.url.includes('sitemap');
  }
  setStorate(): string | null {
    if (sessionStorage.getItem(environment.tokenKey)) {
      return sessionStorage.getItem(environment.tokenKey);
    } else if (localStorage.getItem(environment.tokenKey)) {
      return localStorage.getItem(environment.tokenKey);
    } else {
      return null;
    }
  }

  updateRequestHeader(request: HttpRequest<any>): HttpRequest<any> {
    let newRequestInstance;
    if (request.url.includes(environment.apiUrl)) {
      if (this.isUploadFileRequest(request)) {
        newRequestInstance = request.clone({
          setHeaders: {
            enctype: 'multipart/form-data',
            Authorization: 'Bearer ' + this.setStorate(),
          },
        });
      } else {
        newRequestInstance = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.setStorate(),
          },
        });
      }
    } else {
      newRequestInstance = request;
    }
    return newRequestInstance;
  }

  refreshToken(token: string | null): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/refresh`, token).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    return this.refreshToken(this.setStorate()).pipe(
      switchMap((response: any) => {
        localStorage.setItem(environment.tokenKey, response.access_token);
        return next.handle(this.updateRequestHeader(request));
      }),
      catchError((error) => {
        this.router.navigate(['/auth/login']);
        throw error;
      })
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.updateRequestHeader(request)).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          err.status === 401 &&
          err.error.message.includes('Token has expired')
        ) {
          return this.handle401Error(request, next);
        } else {
          throw err;
        }
      })
    );
  }
}
