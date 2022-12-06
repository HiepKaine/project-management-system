import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {
  ImageUploadControlComponent,
  ImageUploadValue,
  RadioControlComponent,
  TextareaControlComponent,
  TextControlComponent,
  TinymceControlComponent,
} from '@webpress/form';
import { Review } from '@frontend/models/review.model';
import { environment } from '@frontend/env/environment';
import { ApiCollectionResponse } from '@frontend/common';
import { BehaviorSubject } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-edit-course-review',
  templateUrl: './edit-course-review.component.html',
  styleUrls: ['./edit-course-review.component.scss'],
})
export class EditCourseReviewComponent implements OnInit {
  @Input() review!: Review;
  public init$: BehaviorSubject<{ review: Review } | undefined> =
    new BehaviorSubject<{ review: Review } | undefined>(undefined);

  public form: UntypedFormGroup = this.fb.group({
    image: new FormControl('',[Validators.required]),
    user: new FormControl('', [Validators.required]),
    review: new FormControl('', [Validators.required]),
    rateCount: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) { }

  ngOnInit(): void {
    this.init$.next({ review: this.review });
    this.init$.subscribe((data) => {
      if (data) {
        const image: ImageUploadValue[] = [
          {
            uid: '1',
            name: data.review.image,
            status: 'done',
            url: data.review.image,
          },
        ];
        this.form.setValue({
          image: image,
          user: this.review.user,
          review: this.review.review,
          rateCount: this.review.rateCount,
        });
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
              label: 'Tên học viên',
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
    });
  }
}
