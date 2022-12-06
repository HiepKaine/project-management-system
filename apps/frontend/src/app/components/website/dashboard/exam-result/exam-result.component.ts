import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { TestSession } from '@frontend/models/test-session.model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { plainToInstance } from 'class-transformer';
import { distinctUntilChanged, switchMap } from 'rxjs';
import { ExamResultService } from './exam-result.service';
@UntilDestroy()
@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.scss'],
})
export class ExamResultComponent {
  public testSession!: TestSession;

  constructor(
    private route: ActivatedRoute,
    private examResultService: ExamResultService
  ) {
    this.route.params
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        switchMap(({ id }) => this.examResultService.show(id))
      )
      .subscribe((result: ApiItemResponse<TestSession>) => {
        this.testSession = plainToInstance(TestSession, result.data);
      });
  }
}
