import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  SelectControlComponent,
  TextControlComponent,
} from '@webpress/form';

@Component({
  selector: 'app-create-slide-modal',
  templateUrl: './create-slide-modal.component.html',
  styleUrls: ['./create-slide-modal.component.scss'],
})
export class CreateSlideModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    alt: new FormControl(''),
    order: new FormControl(null, [Validators.required]),
    url: new FormControl(null, []),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) { }

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      image: {
        component: ImageUploadControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Ảnh',
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
}
