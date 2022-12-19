import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Student } from '@frontend/models/student';
import { Sex } from '@frontend/models/teacher.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  TextControlComponent,
} from '@webpress/form';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.scss'],
})
export class EditStudentModalComponent implements OnInit {
  @Input() student!: Student;
  public form: UntypedFormGroup = this.fb.group({
    facultyId: new UntypedFormControl('', [Validators.required]),
    classId: new UntypedFormControl('', [Validators.required]),
    studentCode: new UntypedFormControl('', [Validators.required]),
    name: new UntypedFormControl('', [Validators.required]),
    image: new UntypedFormControl('', [Validators.required]),
    studentYear: new UntypedFormControl('', [Validators.required]),
    idCard: new UntypedFormControl('', [Validators.required]),
    phoneNumber: new UntypedFormControl('', [Validators.required]),
    sex: new UntypedFormControl('', [Validators.required]),
    date: new UntypedFormControl('', [Validators.required]),
    address: new UntypedFormControl('', [Validators.required]),
    ethnic: new UntypedFormControl('', [Validators.required]),
    religion: new UntypedFormControl('', [Validators.required]),
    fatherName: new UntypedFormControl('', [Validators.required]),
    fatherJob: new UntypedFormControl('', [Validators.required]),
    fatherPhoneNumber: new UntypedFormControl('', [Validators.required]),
    motherName: new UntypedFormControl('', [Validators.required]),
    motherJob: new UntypedFormControl('', [Validators.required]),
    motherPhoneNumber: new UntypedFormControl('', [Validators.required]),
    note: new UntypedFormControl(''),
  });

  public init$: BehaviorSubject<{ student: Student } | undefined> =
    new BehaviorSubject<{ student: Student } | undefined>(undefined);

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager
  ) {}

  ngOnInit(): void {
    this.init$.next({ student: this.student });
    this.init$.subscribe((data) => {
      if (data) {
        this.form.setValue({
          facultyId: this.student.facultyId,
          classId: this.student.classId,
          studentCode: this.student.studentCode,
          name: this.student.name,
          image: this.student.image,
          studentYear: this.student.studentYear,
          idCard: this.student.idCard,
          phoneNumber: this.student.phoneNumber,
          sex: this.student.sex,
          date: this.student.date,
          address: this.student.address,
          ethnic: this.student.ethnic,
          religion: this.student.religion,
          fatherName: this.student.fatherName,
          fatherJob: this.student.fatherJob,
          fatherPhoneNumber: this.student.fatherPhoneNumber,
          motherName: this.student.motherName,
          motherJob: this.student.motherJob,
          motherPhoneNumber: this.student.motherPhoneNumber,
          note: this.student.note,
        });

        const ngxform = this.ngxFormManager.init(this.form, {
          facultyId: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Khoa',
              className: ['col-12', 'p-1'],
            },
          },
          classId: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Lớp',
              className: ['col-12', 'p-1'],
            },
          },
          studentCode: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Mã sinh viên',
              className: ['col-12', 'p-1'],
            },
          },
          name: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Họ và tên',
              className: ['col-12', 'p-1'],
            },
          },
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
          studentYear: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Khóa học',
              className: ['col-12', 'p-1'],
            },
          },
          idCard: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Căn cước công dân',
              className: ['col-12', 'p-1'],
            },
          },
          phoneNumber: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Mã khoa',
              className: ['col-12', 'p-1'],
            },
          },
          sex: {
            component: TextControlComponent,
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
          date: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Ngày sinh',
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
          ethnic: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Dân tộc',
              className: ['col-12', 'p-1'],
            },
          },
          religion: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Tôn giáo',
              className: ['col-12', 'p-1'],
            },
          },
          fatherName: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Họ tên của bố',
              className: ['col-12', 'p-1'],
            },
          },
          fatherJob: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Nghề nghiệp của bố',
              className: ['col-12', 'p-1'],
            },
          },
          fatherPhoneNumber: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Số điện thoại của bố',
              className: ['col-12', 'p-1'],
            },
          },
          motherName: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Họ tên của mẹ',
              className: ['col-12', 'p-1'],
            },
          },
          motherJob: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Nghề nghiệp của mẹ',
              className: ['col-12', 'p-1'],
            },
          },
          motherPhoneNumber: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Số điện thoại của mẹ',
              className: ['col-12', 'p-1'],
            },
          },
          note: {
            component: TextControlComponent,
            option: {
              nzSize: 'large',
              type: 'text',
              label: 'Ghi chú',
              className: ['col-12', 'p-1'],
            },
          },
        });
        this.ngxFormManager.render(ngxform, this.formInputs.viewContainerRef);
      }
    });
  }
}
