import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Attendance } from '@frontend/models/attendance.model';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit-attendance-modal',
  templateUrl: './edit-attendance-modal.component.html',
  styleUrls: ['./edit-attendance-modal.component.scss'],
})
export class EditAttendanceModalComponent implements OnInit {
  @Input() attendance!: Attendance;
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
    this.form.setValue({
      studentId: this.attendance.studentId,
      subjectId: this.attendance.subjectId,
      totalAbsences: this.attendance.totalAbsences,
    });
    
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
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
