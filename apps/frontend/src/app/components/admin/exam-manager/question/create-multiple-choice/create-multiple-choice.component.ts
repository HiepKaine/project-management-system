import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';

import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';
import { Dictionary } from '@frontend/models/dictionary.model';
import { CreateQuestionDto } from '@frontend/models/question.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import {
  UntilDestroy,
  untilDestroyed,
} from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';
import {
  SelectControlComponent,
  TinymceControlComponent,
} from '@webpress/form';

import { QuestionService } from '../question.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-create-multiple-choice',
  templateUrl: './create-multiple-choice.component.html',
  styleUrls: ['./create-multiple-choice.component.scss'],
})
export class CreateMultipleChoiceComponent implements OnInit {
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
    note: new UntypedFormControl(null, [Validators.required])
  });

  public dictionary!: Dictionary;

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;


  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private store: Store,
    private questionService: QuestionService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.select(ShellSelectors.getDictionary)
      .pipe(
        untilDestroyed(this),
        filter(dictionary => dictionary !== undefined)
      )
      .subscribe((dictionary) => {
        this.dictionary = plainToInstance(Dictionary, dictionary);
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
          }
        });
        this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef);
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
        answers: this.form.get('answers')?.value.map((answer: string, index: number) => ({
          answer,
          isCorrect: index === this.form.get('correctAnswer')?.value
        }))
      }
      this.questionService.create<CreateQuestionDto>(data)
        .subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.create'),
            { nzDuration: 3000 }
          )
          this.router.navigate(['/', 'admin', 'exam-manager', 'question']);
        })
    }
  }
}
