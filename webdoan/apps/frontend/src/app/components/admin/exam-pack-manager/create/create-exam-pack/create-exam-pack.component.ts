import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';

import { environment } from '@frontend/env/environment';
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
  ImageUploadControlComponent, RadioControlComponent, SelectControlComponent,
  TextControlComponent,
  TinymceControlComponent
} from '@webpress/form';

import { ApiCollectionResponse, ApiItemResponse } from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { ExamPackManagerService } from '../../exam-pack-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-create-exam-pack',
  templateUrl: './create-exam-pack.component.html',
  styleUrls: ['./create-exam-pack.component.scss'],
})
export class CreateExamPackComponent implements OnInit {
  @ViewChild('formInputsFistGroup', { static: true })
  formInputsFistGroup!: NgxFormrAnchorComponent;
  @ViewChild('formUploadInput', { static: true })
  formUploadInput!: NgxFormrAnchorComponent;
  @ViewChild('formInputsSecondGroup', { static: true })
  formInputsSecondGroup!: NgxFormrAnchorComponent;
  @ViewChild('formPriceInputs', { static: true })
  formPriceInputs!: NgxFormrAnchorComponent;
  @ViewChild('formStatusInputs', { static: true })
  formStatusInputs!: NgxFormrAnchorComponent;


  public dictionary!: Dictionary;
  public init$: BehaviorSubject<
    { course: Course; dictionary: Dictionary } | undefined
  > = new BehaviorSubject<
    { course: Course; dictionary: Dictionary } | undefined
  >(undefined);

  public form: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    lecturer: new FormControl('', [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    video: new FormControl(null, [Validators.required]),
    isFree: new FormControl(false, [Validators.required]),
    originalPrice: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    status: new FormControl(1, [Validators.required]),
  });


  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
    private examPackManagerService: ExamPackManagerService,
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
                label: 'Tên gói trắc nghiệm',
                className: ['col-12', 'p-1'],
              },
            },
            lecturer: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                type: 'password',
                label: 'Giảng viên',
                className: ['col-12', 'p-1'],
              },
            },
            category: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Danh mục',
                className: ['col-12', 'p-1'],
                nzOptions: this.dictionary.category.map((item) => ({
                  label: item.name,
                  value: item,
                })),
              },
            },
            image: {
              component: ImageUploadControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Ảnh đại diện',
                nzMultiple: false,
                queryParamKey: 'files',
                apiEndPoint: `${environment.apiUrl}/file/upload`,
                reponseHandler: (res: ApiCollectionResponse<{ url: string }>) =>
                  res.data[0].url,
                className: ['col-12', 'p-1'],
              },
            },
            video: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Video giới thiệu (Youtube ID)',
                className: ['col-12', 'p-1'],
              },
            },
            isFree: {
              component: RadioControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                className: ['col-12', 'p-1'],
                nzOptions: [
                  { label: 'Miễn phí', value: true },
                  { label: 'Trả phí', value: false },
                ],
              },
            },
            originalPrice: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                label: 'Giá gốc',
                className: ['col-12', 'col-sm-6', 'p-1'],
              },
            },
            price: {
              component: TextControlComponent,
              option: {
                nzSize: 'large',
                label: 'Giá bán',
                className: ['col-12', 'col-sm-6', 'p-1'],
              },
            },
            status: {
              component: RadioControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                className: ['col-12', 'p-1'],
                nzOptions: [
                  { label: 'Mở bán', value: 1 },
                  { label: 'Ngừng bán', value: 0 },
                ],
              },
            },
          })
          this.ngxFormManager.render(ngxform, this.formInputsFistGroup.viewContainerRef, ['name', 'lecturer', 'category']);
          this.ngxFormManager.render(ngxform, this.formUploadInput.viewContainerRef, ['image']);
          this.ngxFormManager.render(ngxform, this.formInputsSecondGroup.viewContainerRef, ['video', 'description']);
          this.ngxFormManager.render(ngxform, this.formPriceInputs.viewContainerRef, ['isFree', 'originalPrice', 'price']);

          this.form.get('isFree')?.valueChanges.subscribe((isFree: boolean) => {
            this.disablePriceInputs(isFree);
          });

          this.ngxFormManager.render(ngxform, this.formStatusInputs.viewContainerRef, ['status']);
        }
      });
  }

  private disablePriceInputs(isFree: boolean): void {
    if (isFree) {
      this.form.get('price')?.disable();
      this.form.get('originalPrice')?.disable();
    } else {
      this.form.get('price')?.enable();
      this.form.get('originalPrice')?.enable();
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const imageUrl = this.form.get('image')?.value[0]?.url ?? null;
      const data = {
        name: this.form.get('name')?.value,
        lecturer: this.form.get('lecturer')?.value,
        categoryId: this.form.get('category')?.value?.id,
        video: this.form.get('video')?.value,
        image: imageUrl,
        description: this.form.get('description')?.value,
        isFree: this.form.get('isFree')?.value,
        price: this.form.get('price')?.value ?? 0,
        originalPrice: this.form.get('originalPrice')?.value ?? 0,
        status: this.form.get('status')?.value,
        type: this.form.get('type')?.value,
      };
      this.examPackManagerService.create(data).subscribe((result: ApiItemResponse<ExamPack>) => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.create'),
          { nzDuration: 3000 }
        );
        this.router.navigate(['/', 'admin', 'exam-pack-manager', result.data.id, 'edit', 'exam'])
      });
    }
  }
}
