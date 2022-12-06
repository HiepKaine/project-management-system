import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ImageUploadControlComponent } from '@webpress/form';
import { environment } from '@frontend/env/environment';
import { ApiCollectionResponse } from '@frontend/common';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  public form = this.fb.group({
    file: new UntypedFormControl(null, [Validators.required]),
  });
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    const ngxForm = this.ngxFormManager.init(this.form, {
      file: {
        component: ImageUploadControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Chọn file .xlsx',
          nzMultiple: false,
          queryParamKey: 'files',
          apiEndPoint: `${environment.apiUrl}/file/upload`,
          reponseHandler: (res: ApiCollectionResponse<{ url: string }>) =>
            res.data[0].url,
          className: ['col-12'],
        },
      },
    });
    this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const val = this.form.get('file')?.value;
      if (!Array.isArray(val) || val.length !== 1) {
        this.notificationService.error(
          this.translate.instant('error.title'),
          this.translate.instant('error.tryagain'),
          { nzDuration: 3000 }
        );
      } else {
        const path = val[0].raw?.data[0]?.path;
        if (!path) {
          this.notificationService.error(
            this.translate.instant('error.title'),
            this.translate.instant('error.tryagain'),
            { nzDuration: 3000 }
          );
        } else {
          this.questionService.import(path).subscribe(() => {
            this.notificationService.success(
              this.translate.instant('success.title'),
              this.translate.instant('success.create'),
              { nzDuration: 3000 }
            );
          });
        }
      }
    }
  }
}
