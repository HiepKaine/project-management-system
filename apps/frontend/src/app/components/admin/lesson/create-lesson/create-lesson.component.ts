import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { TextareaControlComponent, TextControlComponent } from '@webpress/form';
import { SelectControlComponent } from '@webpress/form';
import { BehaviorSubject, combineLatest } from 'rxjs';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { Dictionary } from '@frontend/models/dictionary.model';
import { LessonService } from '../lesson.service';
import { Lesson } from '@frontend/models/lesson.model';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'app-create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.scss'],
})
export class CreateLessonComponent implements OnInit {
  public createLessonForm: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public lesson!: Lesson;
  public lessonId!: number;
  public dictionary!: Dictionary;
  public init$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager,
    private store: Store,
    private lessonService: LessonService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    combineLatest([this.init$, this.store.select(ShellSelectors.getDictionary)])
      .pipe(untilDestroyed(this))
      .subscribe(([componentInit, dictionary]) => {
        if (componentInit && dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          const ngxform = this.ngxFormManager.init(this.createLessonForm, {
            name: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                label: 'Tên bài giảng',
                className: ['col-12', 'p-1'],
              },
            },
            category: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                label: 'Danh mục',
                className: ['col-12', 'p-1'],
                nzOptions: this.dictionary.category.map((item) => ({
                  label: item.name,
                  value: item,
                })),
              },
            },
            link: {
              component: TextareaControlComponent,
              option: {
                nzSize: 'large',
                label: 'Nhúng bài giảng từ Cloud Flare (Video ID)',
                className: ['col-12', 'p-1'],
              },
            },
          });
          this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
        }
      });
  }

  ngOnInit(): void {
    this.init$.next(true);
  }

  onSubmit() {
    if (this.createLessonForm.invalid) {
      this.ngxFormManager.markAllAsDirty(this.createLessonForm);
    } else {
      const data = {
        name: this.createLessonForm.get('name')?.value,
        categoryId: this.createLessonForm.get('category')?.value?.id,
        link: this.createLessonForm.get('link')?.value,
        description: '',
      };
      this.lessonService.create(data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.create'),
          { nzDuration: 3000 }
        );
      });
    }
  }
}
