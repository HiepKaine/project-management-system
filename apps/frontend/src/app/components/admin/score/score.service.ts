import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Score } from '@frontend/models/score.model';

@Injectable({
  providedIn: 'root',
})
export class ScoreService extends BaseService<Score> {
  public override url = 'score';
}
