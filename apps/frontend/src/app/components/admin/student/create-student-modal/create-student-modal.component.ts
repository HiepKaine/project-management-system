import { Component, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ApiCollectionResponse } from '@frontend/common';
import { environment } from '@frontend/env/environment';
import { Sex } from '@frontend/models/teacher.model';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import {
  ImageUploadControlComponent,
  TextControlComponent,
} from '@webpress/form';

@Component({
  selector: 'app-create-student-modal',
  templateUrl: './create-student-modal.component.html',
  styleUrls: ['./create-student-modal.component.scss'],
})
export class CreateStudentModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    facultyId: new UntypedFormControl('', [Validators.required]),
    classId: new UntypedFormControl('', [Validators.required]),
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
    note: new UntypedFormControl('', [Validators.required]),
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
}
