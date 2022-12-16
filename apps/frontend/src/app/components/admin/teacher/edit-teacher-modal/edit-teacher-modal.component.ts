import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Level, Sex, Teacher } from '@frontend/models/teacher.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { SelectControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.scss'],
})
export class EditTeacherModalComponent implements OnInit {
  @Input() teacher!: Teacher;

  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required]),
    phoneNumber: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormControl('', [Validators.required]),
    sex: new UntypedFormControl('', [Validators.required]),
    level: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    nationality: new UntypedFormControl('', [Validators.required]),
    divisionId: new UntypedFormControl('', [Validators.required]),
    facultyId: new UntypedFormControl('', [Validators.required]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {
    this.form.setValue({
      name: this.teacher.name,
      phoneNumber: this.teacher.phoneNumber,
      address: this.teacher.address,
      sex: this.teacher.sex,
      level: this.teacher.level,
      email: this.teacher.email,
      nationality: this.teacher.nationality,
      divisionId: this.teacher.divisionId,
      facultyId: this.teacher.facultyId,
    });
  }

  ngOnInit(): void {
    const ngxform = this.ngxFormManager.init(this.form, {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Họ và tên',
          className: ['col-12', 'p-1'],
        },
      },

      phoneNumber: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Số điện thoại',
          className: ['col-12', 'p-1'],
        },
      },

      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Email',
          className: ['col-12', 'p-1'],
        },
      },

      address: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Địa chỉ',
          className: ['col-12', 'p-1'],
        },
      },

      sex: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Giới tính',
          nzOptions: [
            {
              label: 'Nữ',
              value: Sex.male,
            },
            {
              label: 'Nam',
              value: Sex.female,
            },
            {
              label: 'Khác',
              value: Sex.other,
            },
          ],
        },
      },

      level: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Trình độ',
          nzOptions: [
            {
              label: 'Cử nhân',
              value: Level.bachelorsDegree,
            },
            {
              label: 'Thạc sĩ',
              value: Level.mastersDegree,
            },
            {
              label: 'Tiến sĩ',
              value: Level.doctorsDegree,
            },
            {
              label: 'Khác',
              value: Level.other,
            },
          ],
        },
      },

      nationality: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Quốc tịch',
          className: ['col-12', 'p-1'],
        },
      },

      divisionId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Bộ môn',
          className: ['col-12', 'p-1'],
          nzOption: [],
        },
      },

      facultyId: {
        component: SelectControlComponent,
        option: {
          nzSize: 'large',
          label: 'Khoa',
          className: ['col-12', 'p-1'],
          nzOption: [],
        },
      },
    });

    this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
  }
}
