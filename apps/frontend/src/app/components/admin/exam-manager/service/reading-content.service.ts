import { Injectable } from '@angular/core';
import { BaseService } from '@frontend/common';
import { ReadingContent } from '@frontend/models/reading-content.model';

@Injectable({
  providedIn: 'root'
})
export class ReadingContentService extends BaseService<ReadingContent> {
  public override url = '/exam/reading-content';
}
