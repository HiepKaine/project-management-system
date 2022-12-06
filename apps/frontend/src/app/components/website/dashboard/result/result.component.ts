import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiPaginateResponse, ApiResponsePagination } from '@frontend/common';
import { Exam } from '@frontend/models/exam.model';
import { TestSession } from '@frontend/models/test-session.model';
import { plainToInstance } from 'class-transformer';
import { ResultService } from './result.service';
import * as moment from 'moment';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  public exam!: Exam;
  public testSessions: TestSession[] = [];
  public pagination!: ApiResponsePagination;

  constructor(
    private resultService: ResultService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getListExam();
  }

  private getListExam() {
    this.resultService
      .getListExam()
      .subscribe((result: ApiPaginateResponse<TestSession>) => {
        this.testSessions = plainToInstance(TestSession, result.data);
        this.pagination = result.meta.pagination;
      });
  }

  passExam(examId: number): boolean {
    const exam = this.testSessions.find((item) => item.examId === examId);
    if (exam) {
      const totalQuestionCorrect = exam.correctQuestion;
      const totalQuestion =
        exam.inCorrectQuestion + exam.skipQuestion + exam.correctQuestion;
      if (totalQuestionCorrect >= totalQuestion / 2) {
        return true;
      } else return false;
    }
    return false;
  }

  getExamTime(item: TestSession): number {
    const startAt = moment(item.startTime);
    const completedAt = moment(item.completedAt);
    return completedAt.diff(startAt, 'm');
  }

  gotoPage(page: number) {
    const params: NavigationExtras = { queryParams: { page }, relativeTo: this.activatedRoute };
    this.router.navigate([], params);
  }
}
