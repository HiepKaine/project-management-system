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
import { ActivatedRoute, Router } from '@angular/router';


import { ApiItemResponse } from '@frontend/common';
import { Dictionary } from '@frontend/models/dictionary.model';
import { ReadingContent, ReadingContentType } from '@frontend/models/reading-content.model';
import {
  UntilDestroy, untilDestroyed
} from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import {
  NgxFormManager,
  NgxFormrAnchorComponent
} from '@ngxform/platform';
import {
  SelectControlComponent,
  TextControlComponent,
  TinymceControlComponent
} from '@webpress/form';
import { ReadingContentService } from '../../service/reading-content.service';
import { CreateReadingContentDto } from '../types';
import * as ShellSelectors from '@frontend/shell/shell.selectors';
import { filter } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@shared/components/notification/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
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
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private readingContentService: ReadingContentService,
    private store: Store,
    private notificationService: NotificationService,
    private translate: TranslateService,
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
  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const data: CreateReadingContentDto = {
        title: this.form.get('title')?.value,
        content: this.form.get('content')?.value,
        categoryId: this.form.get('category')?.value?.id,
        type: this.form.get('type')?.value,
      }
      this.readingContentService.create<CreateReadingContentDto>(data)
        .subscribe(() => {
          this.notificationService.success(
            this.translate.instant('success.title'),
            this.translate.instant('success.create'),
            { nzDuration: 3000 }
          )
          this.router.navigate(['/', 'admin', 'exam-manager', 'reading-content']);
        })
    }
  }
}
