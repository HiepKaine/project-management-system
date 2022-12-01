import { Component } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { ActivatedRoute } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { TestSession } from '@frontend/models/test-session.model';
import { TestSessionManagerService } from '../test-session-manager.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, switchMap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  public testSession!: TestSession;

  constructor(
    private testSessionManagerService: TestSessionManagerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        switchMap(({ testSessionId }) =>
          this.testSessionManagerService.show(testSessionId)
        )
      )
      .subscribe((result: ApiItemResponse<TestSession>) => {
        this.testSession = plainToInstance(TestSession, result.data);
      });
  }

  public config = {
    printMode: 'template',
    popupProperties:
      'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    stylesheets: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css',
      },
    ],
  };
}
