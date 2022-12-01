import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { environment } from '@frontend/env/environment';
import { Dictionary } from '@frontend/models/dictionary.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import {
  SelectControlComponent,
  TextareaControlComponent,
  TextControlComponent,
} from '@webpress/form';

import { Lesson } from '@frontend/models/lesson.model';
import { LessonService } from '../lesson.service';

export interface EditLessonState {
  lesson: Lesson;
}

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [ComponentStore],
})
export class EditComponent implements OnInit {
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public lessonId!: number;
  public lesson!: Lesson;
  public dictionary!: Dictionary;
  public init$: BehaviorSubject<
    { lesson: Lesson; dictionary: Dictionary } | undefined
  > = new BehaviorSubject<
    { lesson: Lesson; dictionary: Dictionary } | undefined
  >(undefined);

  public editLessonForm: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    link: new FormControl(null, [Validators.required]),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
    private lessonService: LessonService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.lessonId = Number(this.activatedRoute.snapshot.params['lessonId']);
    combineLatest([
      this.lessonService.show(this.lessonId),
      this.store.select(ShellSelectors.getDictionary),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([result, dictionary]) => {
        if (result && dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          this.lesson = plainToInstance(Lesson, result.data);
          this.init$.next({ lesson: this.lesson, dictionary: this.dictionary });
        }
      });
  }

  ngOnInit(): void {
    this.init$.subscribe((data) => {
      if (data) {
        this.editLessonForm.setValue({
          name: data.lesson.name,
          category:
            data.dictionary.category.find(
              (item) => Number(item.id) === Number(data.lesson.categoryId)
            ) ?? null,
          link: data.lesson.link,
        });

        this.ngxFormManager.watch('editLesson', this.editLessonForm);
        this.ngxFormManager.cast('editLesson', {
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
        this.ngxFormManager.render(
          'editLesson',
          this.formInputs.viewContainerRef
        );
      }
    });
  }

  onSubmit() {
    if (this.editLessonForm.invalid) {
      this.ngxFormManager.markAllAsDirty(this.editLessonForm);
    } else {
      const data = {
        name: this.editLessonForm.get('name')?.value,
        categoryId: this.editLessonForm.get('category')?.value?.id,
        link: this.editLessonForm.get('link')?.value,
        description: this.lesson.description,
      };
      this.lessonService.update(this.lessonId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    }
  }
}
