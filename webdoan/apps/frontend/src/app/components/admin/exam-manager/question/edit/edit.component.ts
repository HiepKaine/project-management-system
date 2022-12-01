import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { CreateQuestionDto, Question } from '@frontend/models/question.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { SelectControlComponent, TinymceControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { findIndex } from 'lodash-es';
import { filter, BehaviorSubject, combineLatest } from 'rxjs';
import { QuestionService } from '../question.service';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public questionId!: number;
  public question!: Question;
  public form = this.fb.group({
    question: new UntypedFormControl(null, [Validators.required]),
    category: new UntypedFormControl(null, [Validators.required]),
    answers: this.fb.array([
      new UntypedFormControl(null, [Validators.required]),
      new UntypedFormControl(null, [Validators.required]),
      new UntypedFormControl(null, [Validators.required]),
      new UntypedFormControl(null, [Validators.required]),
    ]),
    correctAnswer: new UntypedFormControl(null, [Validators.required]),
    note: new UntypedFormControl(null, [Validators.required]),
  });

  public dictionary!: Dictionary;
  public init$: BehaviorSubject<Question | null> = new BehaviorSubject<Question | null>(null);

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {
    this.activatedRoute.params.pipe(untilDestroyed(this))
      .subscribe(({ questionId }) => {
        if (questionId) {
          this.questionId = Number(questionId);
          this.questionService.show(questionId)
            .subscribe((result: ApiItemResponse<Question>) => {
              this.question = plainToInstance(Question, result.data);
              this.init$.next(this.question);
            })
        }
      })
  }

  ngOnInit(): void {
    combineLatest([this.store.select(ShellSelectors.getDictionary), this.init$])
      .pipe(
        untilDestroyed(this),
        filter(dictionary => dictionary !== undefined)
      )
      .subscribe(([dictionary, question]) => {
        if (dictionary && question) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          console.log(question)
          this.form.setValue({
            question: question.question,
            category: this.dictionary.category.find(item => item.id === question.categoryId) ?? null,
            answers: question.answers.map(item => item.answer),
            correctAnswer: findIndex(question.answers, item => item.isCorrect),
            note: question.note,
          });
          const ngxForm = this.ngxFormManager.init(this.form, {
            question: {
              component: TinymceControlComponent,
              option: {
                nzSize: 'large',
                label: 'Câu hỏi',
                className: ['col-12', 'p-1']
              }
            },
            category: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Danh mục',
                className: ['col-12', 'p-1'],
                nzOptions: this.dictionary.category.map(item => ({ label: item.name, value: item }))
              }
            },
            answers: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"].map(label => ({
              component: TinymceControlComponent,
              option: {
                nzSize: 'large',
                label,
                className: ['col-12', 'p-1']
              }
            })),
            correctAnswer: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Đáp án đúng',
                className: ['col-12', 'p-1'],
                nzOptions: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"].map((label, index) => ({ label, value: index }))
              }
            },
            note: {
              component: TinymceControlComponent,
              option: {
                nzSize: 'large',
                label: "Giải thích đáp án",
                className: ['col-12', 'p-1']
              }
            },
          });
          this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef);
        }
      })
  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const data: CreateQuestionDto = {
        question: this.form.get('question')?.value,
        note: this.form.get('note')?.value,
        categoryId: this.form.get('category')?.value?.id,
        readingContentId: this.question.readingContentId,
        answers: this.form.get('answers')?.value.map((answer: string, index: number) => ({
          answer,
          isCorrect: index === this.form.get('correctAnswer')?.value
        }))
      }
      this.questionService.update(this.questionId, data)
        .subscribe(() => {
          this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.update'), { nzDuration: 3000 })
        })
    }
  }
}
