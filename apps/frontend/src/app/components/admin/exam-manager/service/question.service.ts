import { Injectable } from '@angular/core';

import { BaseService } from '@frontend/common';
import { Question } from '@frontend/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends BaseService<Question>{
  public override url = '/exam/question';
}
