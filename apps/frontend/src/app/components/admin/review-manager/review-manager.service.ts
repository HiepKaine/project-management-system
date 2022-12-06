import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { Review } from '@frontend/models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewManagerService extends BaseService<Review> {
  public override url = '/review';
}
