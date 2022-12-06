import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators
} from '@angular/forms';

import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';

import { Dictionary } from '@frontend/models/dictionary.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import {
  UntilDestroy,
  untilDestroyed
} from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  NgxFormManager,
  NgxFormrAnchorComponent
} from '@ngxform/platform';
import {
  SelectControlComponent,
  TinymceControlComponent
} from '@webpress/form';


@UntilDestroy()
@Component({
  selector: 'app-create-reading-content-question-modal',
  templateUrl: './create-reading-content-question-modal.component.html',
  styleUrls: ['./create-reading-content-question-modal.component.scss'],
})
export class CreateReadingContentQuestionModalComponent implements OnInit {
  public form = this.fb.group({
    question: new UntypedFormControl(null, [Validators.required]),
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
  ) { }

  ngOnInit(): void {
    this.store.select(ShellSelectors.getDictionary)
      .pipe(
        untilDestroyed(this),
        filter(dictionary => dictionary !== undefined)
      )
      .subscribe((dictionary) => {
        this.dictionary = plainToInstance(Dictionary, dictionary);
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
      })
  }

}
