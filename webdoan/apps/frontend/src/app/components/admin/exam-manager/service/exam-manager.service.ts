import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiPaginateResponse,
  ApiSuccessResponse,
  BaseService
} from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Exam } from '@frontend/models/exam.model';
import { Question } from '@frontend/models/question.model';
import { ReadingContent } from '@frontend/models/reading-content.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamManagerService extends BaseService<Exam> {
  public override url = '/exam';

  getActiveQuestions(): Observable<ApiPaginateResponse<Question>>;
  getActiveQuestions(param?: {
    categoryId?: number;
    limit?: number;
    keyword?: string;
    page?: number;
    hasReadingContent?: boolean;
  }): Observable<ApiPaginateResponse<Question>>;
  getActiveQuestions(param?: {
    categoryId?: number;
    keyword?: string;
    limit?: number;
    page?: number;
  }): Observable<ApiPaginateResponse<Question>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<Question>>(
      `${environment.apiUrl}/exam/question`,
      { params }
    );
  }

  getActiveReadingContent(): Observable<ApiPaginateResponse<ReadingContent>>;
  getActiveReadingContent(param?: {
    categoryId?: number;
    keyword?: string;
    limit?: number;
    page?: number;
    hasReadingContent?: boolean;
  }): Observable<ApiPaginateResponse<ReadingContent>>;
  getActiveReadingContent(param?: {
    categoryId?: number;
    limit?: number;
    keyword?: string;
    page?: number;
  }): Observable<ApiPaginateResponse<ReadingContent>> {
    const params = new HttpParams({ fromObject: param ?? {} });
    return this.http.get<ApiPaginateResponse<ReadingContent>>(
      `${environment.apiUrl}/exam/reading-content`,
      { params }
    );
  }

  addQuestion(
    examId: number,
    questionId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      `${environment.apiUrl}/exam/${examId}/question`,
      { questionId }
    );
  }

  addManyQuestion(
    examId: number,
    questionIds: number[]
  ): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      `${environment.apiUrl}/exam/${examId}/question`,
      { questionIds }
    );
  }

  addQuestionByCategory(
    examId: number,
    params: { categoryIds: number[]; questionCount: number }
  ): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(
      `${environment.apiUrl}/exam/${examId}/add-question-by-category`,
      params
    );
  }

  removeQuestion(
    examId: number,
    questionId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/exam/${examId}/question/${questionId}`
    );
  }

  removeReadingContent(
    examId: number,
    readingContentId: number
  ): Observable<ApiSuccessResponse> {
    return this.http.delete<ApiSuccessResponse>(
      `${environment.apiUrl}/exam/${examId}/reading-content/${readingContentId}`
    );
  }
}
