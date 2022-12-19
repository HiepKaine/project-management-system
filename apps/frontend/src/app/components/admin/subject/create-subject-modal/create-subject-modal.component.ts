import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-subject-modal',
  templateUrl: './create-subject-modal.component.html',
  styleUrls: ['./create-subject-modal.component.scss'],
})
export class CreateSubjectModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required]),
    subjectCode: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên môn học',
          className: ['col-12', 'p-1'],
        },
      },

      subjectCode: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Mã môn học',
          className: ['col-12', 'p-1'],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
