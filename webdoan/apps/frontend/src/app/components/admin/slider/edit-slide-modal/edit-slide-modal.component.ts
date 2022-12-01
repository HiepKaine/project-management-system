import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Slide } from '@frontend/models/slide.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  ImageUploadValue,
  SelectControlComponent,
  TextControlComponent,
} from '@webpress/form';
import { BehaviorSubject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-edit-slide-modal',
  templateUrl: './edit-slide-modal.component.html',
  styleUrls: ['./edit-slide-modal.component.scss'],
})
export class EditSlideModalComponent implements OnInit {
  @Input() slide!: Slide;

  public init$: BehaviorSubject<{ slide: Slide } | undefined> =
    new BehaviorSubject<{ slide: Slide } | undefined>(undefined);

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  public form: UntypedFormGroup = this.fb.group({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    alt: new FormControl(''),
    order: new FormControl('', [Validators.required]),
    url: new FormControl(null, []),
  });

  constructor(private fb: UntypedFormBuilder, private ngxFormManager: NgxFormManager) {
    this.init$.next({ slide: this.slide });
  }

  ngOnInit(): void {
    this.init$.next({ slide: this.slide });
    this.init$.subscribe((data) => {
      if (data) {
        const imageImputValues: ImageUploadValue[] = [
          {
            uid: '1',
            name: data.slide.image,
            status: 'done',
            url: data.slide.image,
          },
        ];

        this.form.setValue({
          image: imageImputValues,
          name: data.slide.name,
          alt: data.slide.alt,
          url: data.slide.url,
          order: data.slide.order,
        });

        const ngxform = this.ngxFormManager.init(this.form, {
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
              className: ['col-12'],
            },
          },
          name: {
            component: SelectControlComponent,
            option: {
              nzSize: 'large',
              label: 'Vị trí',
              className: ['col-12'],
              nzOptions: [
                { label: 'Ảnh bìa', value: 'header' },
                { label: 'Đăng ký học ngay', value: 'register' },
              ],
            },
          },
          alt: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Mô tả ảnh',
              className: ['col-12'],
            },
          },
          order: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              label: 'Thứ tự ưu tiên',
              className: ['col-12'],
            },
          },
          url: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              label: 'Đường dẫn',
              className: ['col-12'],
            },
          },
        });
        this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
      }
    });
  }
}
