import { Component, ViewChild, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-attendance-modal',
  templateUrl: './create-attendance-modal.component.html',
  styleUrls: ['./create-attendance-modal.component.scss'],
})
export class CreateAttendanceModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    studentId: new UntypedFormControl('', [Validators.required]),
    subjectId: new UntypedFormControl('', [Validators.required]),
    totalAbsences: new UntypedFormControl('', [Validators.required]),
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
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Họ và tên',
          className: ['col-12', 'p-1'],
        },
      },

      subjectId: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Môn học',
          className: ['col-12', 'p-1'],
        },
      },
      
      totalAbsences: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Số buổi vắng',
          className: ['col-12', 'p-1'],
        },
      }
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
