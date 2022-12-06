import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
import { CourseService } from '../../course.service';

@UntilDestroy()
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
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
    description: new FormControl(null, [Validators.required]),
    isFreeCourse: new FormControl(false, [Validators.required]),
    originalPrice: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    status: new FormControl(1, [Validators.required]),
    type: new FormControl(1, [Validators.required]),
  });


  constructor(
    private fb: UntypedFormBuilder,
    private store: Store,
    private ngxFormManager: NgxFormManager,
    private courseService: CourseService,
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
            description: {
              component: TinymceControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Mô tả nội dung khoá học',
                queryParamKey: 'files',
                apiEndPoint: `${environment.apiUrl}/file/upload`,
                className: ['col-12', 'p-1'],
              },
            },
            isFreeCourse: {
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
            type: {
              component: SelectControlComponent,
              option: {
                nzSize: 'large',
                type: 'text',
                label: 'Phân loại',
                className: ['col-12', 'p-1'],
                nzOptions: [
                  {
                    label: 'KHOÁ ÔN CÔNG CHỨC',
                    value: 1,
                  },
                  {
                    label: 'KHOÁ ÔN VIÊN CHỨC',
                    value: 2,
                  }
                ]
              },
            },
          })
          this.ngxFormManager.render(ngxform, this.formInputsFistGroup.viewContainerRef, ['name', 'lecturer', 'category']);
          this.ngxFormManager.render(ngxform, this.formUploadInput.viewContainerRef, ['image']);
          this.ngxFormManager.render(ngxform, this.formInputsSecondGroup.viewContainerRef, ['video', 'description', 'type']);
          this.ngxFormManager.render(ngxform, this.formPriceInputs.viewContainerRef, ['isFreeCourse', 'originalPrice', 'price']);

          this.form.get('isFreeCourse')?.valueChanges.subscribe((isFreeCourse: boolean) => {
            this.disablePriceInputs(isFreeCourse);
          });

          this.ngxFormManager.render(ngxform, this.formStatusInputs.viewContainerRef, ['status']);
        }
      });
  }

  private disablePriceInputs(isFreeCourse: boolean): void {
    if (isFreeCourse) {
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
        isFreeCourse: this.form.get('isFreeCourse')?.value,
        price: this.form.get('price')?.value ?? 0,
        originalPrice: this.form.get('originalPrice')?.value ?? 0,
        status: this.form.get('status')?.value,
        type: this.form.get('type')?.value,
      };
      this.courseService.create(data).subscribe((result: ApiItemResponse<Course>) => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.create'),
          { nzDuration: 3000 }
        );
        this.router.navigate(['/', 'admin', 'course', result.data.id, 'edit', 'lesson'])
      });
    }
  }
}
