import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ApiItemResponse } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { Question } from '@frontend/models/question.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TinymceControlComponent, TextControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { findIndex } from 'lodash-es';
import { filter, BehaviorSubject, combineLatest } from 'rxjs';
import { QuestionService } from '../../../question/question.service';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit-reading-content-question-modal.component.html',
  styleUrls: ['./edit-reading-content-question-modal.component.scss'],
})
export class EditReadingContentQuestionModalComponent implements OnInit {
  @Input() question!: Question;
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
    type: new UntypedFormControl(null, [Validators.required]),
  });

  public dictionary!: Dictionary;
  public init$: BehaviorSubject<Question | null> = new BehaviorSubject<Question | null>(null);

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  constructor(
    private questionService: QuestionService,
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
  ) { }

  ngOnInit(): void {
    this.questionService.show(this.question.id)
      .subscribe((result: ApiItemResponse<Question>) => {
        this.question = plainToInstance(Question, result.data);
        this.init$.next(this.question);
      })
    combineLatest([this.store.select(ShellSelectors.getDictionary), this.init$])
      .pipe(
        untilDestroyed(this),
        filter(dictionary => dictionary !== undefined)
      )
      .subscribe(([dictionary, question]) => {
        if (dictionary && question) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          this.form.setValue({
            question: question.question,
            category: this.dictionary.category.find(item => item.id === question.categoryId) ?? null,
            answers: question.answers.map(item => item.answer),
            correctAnswer: findIndex(question.answers, item => item.isCorrect),
            note: question.note,
            type: question.readingContentId,
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
}
