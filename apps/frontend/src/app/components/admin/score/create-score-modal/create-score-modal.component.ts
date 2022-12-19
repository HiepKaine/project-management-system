import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-score-modal',
  templateUrl: './create-score-modal.component.html',
  styleUrls: ['./create-score-modal.component.scss'],
})
export class CreateScoreModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    studentId: new UntypedFormControl('', [Validators.required]),
    subjectId: new UntypedFormControl('', [Validators.required]),
    score: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;
  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      studentId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Sinh viên',
          nzOption: [],
        },
      },

      subjectId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Môn',
          nzOption: [],
        },
      },

      score: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Điểm',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
