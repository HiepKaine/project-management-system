import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { environment } from '@frontend/env/environment';
import {
  FormControl,
  NgxFormrAnchorComponent,
  FormBuilder,
  NgxFormManager,
} from '@ngxform/platform';
import { TextControlComponent, TinymceControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-faq-modal',
  templateUrl: './create-faq-modal.component.html',
  styleUrls: ['./create-faq-modal.component.scss'],
})
export class CreateFaqModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    question: new FormControl('', [Validators.required]),
    answer: new FormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
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
}
