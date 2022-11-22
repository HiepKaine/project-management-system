import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';

@Injectable()
export class LayoutService {

  protected layoutSize$ = new Subject();

  changeLayoutSize() {
    this.layoutSize$.next(1);
  }

  onChangeLayoutSize(): Observable<unknown> {
    return this.layoutSize$.pipe(
      share(),
      delay(1),
    );
  }
}
