import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';

import { Course } from '@frontend/models/course.model';
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

import { ApiItemResponse } from '@frontend/common';
import { Exam } from '@frontend/models/exam.model';
import { ExamManagerService } from '../../../service/exam-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss'],
})
export class CreateExamComponent implements OnInit {
  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;

  public dictionary!: Dictionary;

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
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.store.select(ShellSelectors.getDictionary)
      .pipe(untilDestroyed(this))
      .subscribe((dictionary: Dictionary | undefined) => {
        if (dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          const ngxform = this.ngxFormManager.init(this.form, {
            name: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                label: 'Tên đề trắc nghiệm',
                className: ['col-12', 'col-sm-6'],
              },
            },
            category: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Danh mục',
                className: ['col-12', 'col-sm-6'],
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
      this.examManagerService.create(data).subscribe((result: ApiItemResponse<Exam>) => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.create'),
          { nzDuration: 3000 }
        );
        this.router.navigate(['/', 'admin', 'exam-manager', 'exam', result.data.id, 'edit', 'question'])
      });
    }
  }
}
