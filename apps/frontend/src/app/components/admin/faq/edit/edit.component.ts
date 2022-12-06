import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiItemResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Faq } from '@frontend/models/faq.modal';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TextControlComponent, TinymceControlComponent } from '@webpress/form';
import { plainToInstance } from 'class-transformer';
import { FaqService } from '../faq.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public faqId!: number;
  public faq!: Faq;
  public editFaqForm: UntypedFormGroup = this.fb.group({
    question: new FormControl(null, [Validators.required]),
    answer: new FormControl(null, [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private activatedRoute: ActivatedRoute,
    private faqSevice: FaqService,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.faqId = Number(this.activatedRoute.snapshot.params['id']);
    this.faqSevice
      .show(this.faqId)
      .subscribe((result: ApiItemResponse<Faq>) => {
        this.faq = plainToInstance(Faq, result.data);
        this.editFaqForm.setValue({
          question: this.faq.question,
          answer: this.faq.answer,
        });
      });
  }

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.editFaqForm, {
      question: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Câu hỏi',
          className: ['col-12', 'p-1'],
        },
      },

      answer: {
        component: TinymceControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Câu trả lời',
          queryParamKey: 'files',
          apiEndPoint: `${environment.apiUrl}/file/upload`,
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }

  onSubmit() {
    if (this.editFaqForm.valid) {
      const data = {
        question: this.editFaqForm.get('question')?.value,
        answer: this.editFaqForm.get('answer')?.value,
      };
      this.faqSevice.update(this.faqId, data).subscribe(() => {
        this.notificationService.success(
          this.translate.instant('success.title'),
          this.translate.instant('success.update'),
          { nzDuration: 3000 }
        );
      });
    } else {
      this.ngxFormManager.markAllAsDirty(this.editFaqForm);
    }
  }
}
