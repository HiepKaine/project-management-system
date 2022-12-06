import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';
import { isBoolean } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { environment } from '@frontend/env/environment';
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
  ImageUploadControlComponent,
  ImageUploadValue,
  RadioControlComponent, SelectControlComponent,
  TextControlComponent
} from '@webpress/form';

import { ApiCollectionResponse } from '@frontend/common';
import { ExamPack } from '@frontend/models/exam-pack.model';
import { ExamPackManagerService } from '../../exam-pack-manager.service';

@UntilDestroy()
@Component({
  selector: 'app-edit-examPack',
  templateUrl: './edit-exam-pack.component.html',
  styleUrls: ['./edit-exam-pack.component.scss'],
})
export class EditExamPackComponent implements OnInit {
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


  public examPackId!: number;
  public examPack!: ExamPack;
  public dictionary!: Dictionary;
  public init$: BehaviorSubject<
    { examPack: ExamPack; dictionary: Dictionary } | undefined
  > = new BehaviorSubject<
    { examPack: ExamPack; dictionary: Dictionary } | undefined
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
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.examPackId = Number(this.activatedRoute.snapshot.params['id']);
    combineLatest([
      this.examPackManagerService.show(this.examPackId),
      this.store.select(ShellSelectors.getDictionary),
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([result, dictionary]) => {
        if (result && dictionary) {
          this.dictionary = plainToInstance(Dictionary, dictionary);
          this.examPack = plainToInstance(ExamPack, result.data);
          this.init$.next({ examPack: this.examPack, dictionary: this.dictionary });
        }
      });
  }

  ngOnInit(): void {
    this.init$.subscribe((data) => {
      if (data) {
        const imageImputValues: ImageUploadValue[] = [
          {
            uid: '1',
            name: data.examPack.image,
            status: 'done',
            url: data.examPack.image,
          },
        ];

        this.form.setValue({
          name: data.examPack.name,
          lecturer: data.examPack.lecturer,
          category:
            data.dictionary.category.find(
              (item) => Number(item.id) === Number(data.examPack.categoryId)
            ) ?? null,
          image: imageImputValues,
          video: data.examPack.video,
          isFree: data.examPack.isFree,
          originalPrice: data.examPack.originalPrice,
          price: data.examPack.price,
          status: data.examPack.status,
        });
        if (isBoolean(data.examPack.isFree)) {
          this.disablePriceInputs(data.examPack.isFree);
        }
        const ngxform = this.ngxFormManager.init(this.form, {
          name: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              label: 'Tên khoá học',
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
              nzOptions: data.dictionary.category.map((item) => ({
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
        this.ngxFormManager.render(ngxform, this.formInputsSecondGroup.viewContainerRef, ['video']);
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
        video: this.form.get('video')?.value,
        price: this.form.get('price')?.value,
        originalPrice: this.form.get('originalPrice')?.value,
        image: imageUrl,
        status: this.form.get('status')?.value,
        isFree: this.form.get('isFree')?.value,
        categoryId: this.form.get('category')?.value?.id,
      };
      this.examPackManagerService.update(this.examPackId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    }
  }
}
