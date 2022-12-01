import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { Dictionary } from '@frontend/models/dictionary.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import {
  SelectControlComponent,
  TextControlComponent
} from '@webpress/form';

import { Exam } from '@frontend/models/exam.model';
import { ExamManagerService } from '../../../service/exam-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.scss'],
})
export class EditExamComponent implements OnInit {
  public examId!: number;
  public exam!: Exam;
  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  public dictionary!: Dictionary;
  public init$: BehaviorSubject<{ exam: Exam } | null> = new BehaviorSubject<{ exam: Exam } | null>(null);

  public form: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    category: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    referencePoint: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
    retry: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
  });


  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
    private examManagerService: ExamManagerService,
    private router: Router,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((data: Params) => {
      this.examId = Number(data['examId']);
      combineLatest([
        this.examManagerService.show(this.examId),
        this.store.select(ShellSelectors.getDictionary),
      ])
        .pipe(untilDestroyed(this))
        .subscribe(([result, dictionary]) => {
          if (result && dictionary) {
            this.dictionary = plainToInstance(Dictionary, dictionary);
            this.exam = plainToInstance(Exam, result.data);
            this.init$.next({ exam: this.exam });
          }
        });
    })
  }

  ngOnInit(): void {

    this.init$.pipe(untilDestroyed(this))
      .subscribe((data) => {
        if (data) {
          this.form.setValue({
            name: data.exam.name,
            category:
              this.dictionary.category.find(
                (item) => Number(item.id) === Number(data.exam.categoryId)
              ) ?? null,
            duration: data.exam.duration,
            referencePoint: data.exam.referencePoint,
            retry: data.exam.retry,
          })
          const ngxform = this.ngxFormManager.init(this.form, {
            name: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                label: 'Tên đề trắc nghiệm',
                className: ['col-6'],
              },
            },
            category: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Danh mục',
                className: ['col-6'],
                nzOptions: this.dictionary.category.map((item) => ({
                  label: item.name,
                  value: item,
                })),
              },
            },
            duration: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Thời gian làm bài',
                className: ['col-12', 'col-sm-4'],
              },
            },
            referencePoint: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Điểm đạt',
                className: ['col-12', 'col-sm-4'],
              },
            },
            retry: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Số lần làm bài',
                className: ['col-12', 'col-sm-4'],
              },
            },
          })
          this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);

        }
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const data = {
        name: this.form.get('name')?.value,
        categoryId: this.form.get('category')?.value?.id,
        duration: this.form.get('duration')?.value,
        referencePoint: this.form.get('referencePoint')?.value,
        retry: this.form.get('retry')?.value,
      };
      this.examManagerService.update(this.examId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    }
  }
}
