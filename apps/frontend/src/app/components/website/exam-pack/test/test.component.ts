import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { Answer } from '@frontend/models/answer.model';
import { Question } from '@frontend/models/question.model';
import { TestSession } from '@frontend/models/test-session.model';
import { User } from '@frontend/models/user.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { findIndex, first, groupBy } from 'lodash-es';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CountdownComponent } from 'ngx-countdown';
import { BehaviorSubject, filter, OperatorFunction } from 'rxjs';
import { ExamPackService } from '../exam-pack.service';
import { ExamQuestionItem } from './types';

@UntilDestroy()
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  public questionItems: ExamQuestionItem[] = [];
  public testSession!: TestSession;
  public profile!: User;
  public currentQuestion!: ExamQuestionItem;
  public currentQuestionIndex = 0;
  public answers!: Answer;
  public selectedAnswers: Map<number, Answer> = new Map<number, Answer>();
  private timmerStarted = false;
  public timmerConfig = { leftTime: 0 };
  public timmer$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  @ViewChild('cd', { static: true }) private countdown!: CountdownComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examPackService: ExamPackService,
    private store: Store,
    private router: Router,
    private modal: NzModalService,
  ) {
    this.store.select(ShellSelectors.getShellProfile)
      .pipe(
        untilDestroyed(this),
        filter((user: User | undefined) => user !== undefined) as OperatorFunction<User | undefined, User>,
      )
      .subscribe((user) => {
        this.profile = plainToInstance(User, user);
      })

    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe(({ testSessionId }) => {
        this.examPackService.getTestSession(Number(testSessionId)).subscribe((result: ApiItemResponse<TestSession>) => {
          this.testSession = plainToInstance(TestSession, result.data);
          console.log(this.testSession);
          const groupOfQuestions = groupBy(this.testSession.examCode.questions, 'readingContentId');

          for (let i = 0; i < this.testSession.examCode.questions.length; i++) {
            if (this.testSession.examCode.questions[i].readingContentId === null) {
              this.questionItems.push({
                label: `Câu ${i + 1}`,
                data: this.testSession.examCode.questions[i],
                readingContentId: null,
                startAt: i,
                endAt: i,
              });
            } else {
              if (!this.questionItems.find((item: ExamQuestionItem) => item.readingContentId === this.testSession.examCode.questions[i].readingContentId)) {
                const startAt = i;
                const endAt = i + groupOfQuestions[this.testSession.examCode.questions[i].readingContentId as number].length;
                this.questionItems.push({
                  label: `Câu ${startAt + 1} - ${endAt}`,
                  data: groupOfQuestions[this.testSession.examCode.questions[i].readingContentId as number],
                  readingContentId: this.testSession.examCode.questions[i].readingContentId,
                  startAt,
                  endAt,
                });
              }
            }
          }
          console.log(this.questionItems);
          this.fillSelectedAnswer(this.testSession);
          const firstQuestion = first(this.questionItems);
          if (firstQuestion) {
            this.currentQuestion = firstQuestion;
          }
          this.caculateRemainingTime(this.testSession);
        })
      })

  }
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event: any) {
    return false;
  }

  private caculateRemainingTime(testSession: TestSession): void {
    this.examPackService.getCurrentTimeInServer().subscribe((result: ApiItemResponse<{ time: string }>) => {
      const now = moment(result.data.time);
      const passedTimeInSecond = Math.round(now.diff(moment(this.testSession.startTime)) / 1000);
      const durationInSecond = Math.round(testSession.examCode.exam.duration * 60);
      const remainingTime = durationInSecond - passedTimeInSecond > 0 ? durationInSecond - passedTimeInSecond : 0;
      this.timmer$.next(remainingTime);
    })

  }

  private fillSelectedAnswer(testSession: TestSession) {
    if (Array.isArray(testSession.testSessionAnswers) && testSession.testSessionAnswers.length > 0) {
      for (let i = 0; i < testSession.testSessionAnswers.length; i++) {
        const question = testSession.examCode.questions.find(item => item.id === testSession.testSessionAnswers[i].questionId);
        if (question) {
          const answer = question.answers.find(item => item.id === testSession.testSessionAnswers[i].answerId);
          if (answer) {
            this.setAnswer(question, answer);
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.timmer$.pipe(untilDestroyed(this))
      .subscribe((remainingTimeInSecond: number | null) => {
        if (remainingTimeInSecond) {
          this.countdown.config = { ...this.timmerConfig, ...{ leftTime: remainingTimeInSecond } };
          this.countdown.restart();
        }
      })

    this.countdown.event
      .pipe(filter(event => event.action === 'done'))
      .subscribe(() => {
        if (this.timmerStarted) {
          this.submit();
          this.modal.confirm({
            nzTitle: 'Hết thời gian',
            nzContent: 'Bạn đã hết thời gian làm bài',
            nzOnOk: () => console.log('OK')
          });
        } else {
          this.timmerStarted = true;
        }

      })

  }

  select(q: ExamQuestionItem, index: number) {
    this.currentQuestion = q;
    this.currentQuestionIndex = index;
  }

  isFirstQuestion(): boolean {
    return findIndex(this.questionItems, (item) => item === this.currentQuestion) === 0;
  }

  isLastQuestion(): boolean {
    return findIndex(this.questionItems, (item) => item === this.currentQuestion) === this.questionItems.length - 1;
  }

  isAnswerred(item: ExamQuestionItem): boolean {
    if (item.readingContentId) {
      return false;
    } else {
      return this.selectedAnswers.has((item.data as Question).id);
    }
  }

  answerQuestion(data: { question: Question, answer: Answer }) {
    this.setAnswer(data.question, data.answer);
    this.examPackService.answer(this.testSession.id, data.question.id, data.answer.id)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .subscribe(() => { })
  }

  private setAnswer(question: Question, answer: Answer) {
    this.selectedAnswers.set(question.id, answer);
  }

  submit() {
    this.examPackService.complete(this.testSession.id)
      .subscribe((result: ApiItemResponse<TestSession>) => {
        this.router.navigate(['/', 'dashboard', 'result', result.data.id]);
      })
  }

  private getQuestionByIndex(i: number) {
    return this.questionItems[i];
  }

  selectPrevQuestion(): void {
    const currentQuestionIndex = findIndex(this.questionItems, (item) => item === this.currentQuestion);
    if (currentQuestionIndex > 0) {
      this.select(this.getQuestionByIndex(currentQuestionIndex - 1), currentQuestionIndex);
    }
  }

  selectNextQuestion(): void {
    const currentQuestionIndex = findIndex(this.questionItems, (item) => item === this.currentQuestion);
    if (currentQuestionIndex < this.questionItems.length - 1) {
      this.select(this.getQuestionByIndex(currentQuestionIndex + 1), currentQuestionIndex);
    }
  }
}
