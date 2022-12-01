import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { ReadingContent, ReadingContentType } from '@frontend/models/reading-content.model';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { SelectControlComponent, TextControlComponent, TinymceControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { filter } from 'rxjs';
import { ReadingContentService } from '../../../service/reading-content.service';
import { UpdateReadingContentDto } from '../../types';

@UntilDestroy()
@Component({
  selector: 'app-edit-reading-content',
  templateUrl: './edit-reading-content.component.html',
  styleUrls: ['./edit-reading-content.component.scss'],
})
export class EditReadingContentComponent implements OnInit {
  public readingContentId!: number;
  public readingContent!: ReadingContent;
  public form = this.fb.group({
    title: new UntypedFormControl(null, [Validators.required]),
    content: new UntypedFormControl(null, [Validators.required]),
    category: new UntypedFormControl(null, [Validators.required]),
    type: new UntypedFormControl(null, [Validators.required]),
  });

  public dictionary!: Dictionary;

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private readingContentService: ReadingContentService,
    private store: Store,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {

  }

  ngOnInit(): void {
    this.store.select(ShellSelectors.getDictionary)
      .pipe(
        untilDestroyed(this),
        filter(dictionary => dictionary !== undefined)
      )
      .subscribe((dictionary) => {
        this.dictionary = plainToInstance(Dictionary, dictionary);
        this.readingContentId = Number(this.activatedRoute.snapshot.params['readingContentId']);
        this.readingContentService.show(this.readingContentId)
          .subscribe((result: ApiItemResponse<ReadingContent>) => {
            this.readingContent = plainToInstance(ReadingContent, result.data);
            this.form.setValue({
              title: this.readingContent.title,
              content: this.readingContent.content,
              category: this.dictionary.category.find(item => item.id === this.readingContent.categoryId) ?? null,
              type: this.readingContent.type,
            })
            const ngxForm = this.ngxFormManager.init(this.form, {
              title: {
                component: TextControlComponent,
                option: {
                  nzSize: 'large',
                  label: 'Tiêu đề',
                  className: ['col-12', 'p-1']
                }
              },
              content: {
                component: TinymceControlComponent,
                option: {
                  nzSize: 'large',
                  label: "Nội dung",
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
              type: {
                component: SelectControlComponent,
                option: {
                  nzSize: 'large',
                  type: 'text',
                  label: 'Phân loại',
                  className: ['col-12', 'p-1'],
                  nzOptions: [{ label: 'Điền từ', value: ReadingContentType.fillWord }, { label: 'Bài đọc', value: ReadingContentType.readings }]
                }
              },
            });
            this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef);
          })
      });

  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const data: UpdateReadingContentDto = {
        title: this.form.get('title')?.value,
        content: this.form.get('content')?.value,
        categoryId: this.form.get('category')?.value?.id,
        type: this.form.get('type')?.value,
      }
      this.readingContentService.update<UpdateReadingContentDto>(this.readingContentId, data)
        .subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.update'),
            { nzDuration: 3000 }
          )
          this.router.navigate(['/', 'admin', 'exam-manager', 'reading-content']);
        })
    }
  }
}
