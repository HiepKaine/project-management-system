import { Injectable } from '@angular/core';

import { ApiSuccessResponse, BaseService } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Question } from '@frontend/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<Question>{
  public override url = '/exam/question';

  import(path: string): Observable<ApiSuccessResponse> {
    return this.http.post<ApiSuccessResponse>(`${environment.apiUrl}${this.url}/import`, { path })
  }
}
