import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, UntypedFormGroup } from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  RadioControlComponent,
  TextareaControlComponent,
  TextControlComponent,
  TinymceControlComponent,
} from '@webpress/form';

@Component({
  selector: 'app-add-exam-pack-review',
  templateUrl: './add-exam-pack-review.component.html',
  styleUrls: ['./add-exam-pack-review.component.scss'],
})
export class AddExamPackReviewComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    image: new FormControl('', [Validators.required]),
    user: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    rateCount: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      image: {
        component: ImageUploadControlComponent,
        option: {
          NzSize: 'large',
          type: 'image',
          label: 'Ảnh',
          nzMultiple: false,
          queryParamKey: 'files',
          apiEndPoint: `${environment.apiUrl}/file/upload`,
          reponseHandler: (res: ApiCollectionResponse<{ url: string }>) =>
            res.data[0].url,
          className: ['col-12', 'p-1'],
        },
      },
      user: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên',
          className: ['col-12', 'p-1'],
        },
      },
      review: {
        component: TinymceControlComponent,
        option: {
          nzSize: 'large',
          label: 'Đánh giá',
          className: ['col-12', 'p-1'],
        },
      },
      rateCount: {
        component: RadioControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          className: ['col-12', 'p-1'],
          nzOptions: [
            { label: '1 Sao', value: 1 },
            { label: '2 Sao', value: 2 },
            { label: '3 Sao', value: 3 },
            { label: '4 Sao', value: 4 },
            { label: '5 Sao', value: 5 },
          ],
        },
      },
    });
    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
