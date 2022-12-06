import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  UntypedFormGroup,
  Validators
} from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent
} from '@ngxform/platform';
import { RadioControlComponent, TextareaControlComponent, TextControlComponent } from '@webpress/form';

@Component({
  selector: 'app-create-contact-modal',
  templateUrl: './create-contact-modal.component.html',
  styleUrls: ['./create-contact-modal.component.scss'],
})
export class CreateContactModalComponent implements OnInit {
  public form: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    status: new FormControl(1, [Validators.required]),
    content: new FormControl('', []),
    organization: new FormControl('', []),
    position: new FormControl('', []),
  })

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;


  constructor(
    private fb: FormBuilder,
    private ngxFormManager: NgxFormManager,
  ) { }

  ngOnInit(): void {
    this.ngxFormManager.watch('editContactForm', this.form);
    this.ngxFormManager.cast('editContactForm', {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Tên học viên',
          className: ['col-12', 'col-sm-6']
        }
      },
      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Email học viên',
          className: ['col-12', 'col-sm-6']
        }
      },
      phone: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Số điện thoại',
          className: ['col-12']
        }
      },
      organization: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Cơ quan ứng tuyển',
          className: ['col-12', 'col-sm-6']
        }
      },
      position: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          label: 'Vị trí ứng tuyển',
          className: ['col-12', 'col-sm-6']
        }
      },
      content: {
        component: TextareaControlComponent,
        option: {
          nzSize: 'large',
          label: 'Nội dung',
          className: ['col-12']
        }
      },
      status: {
        component: RadioControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          className: ['col-12'],
          nzOptions: [{ label: 'Đã liên hệ', value: 1 }, { label: 'Chưa liên hệ', value: 0 }]
        }
      },
    })
    this.ngxFormManager.render('editContactForm', this.formInputs.viewContainerRef);
  }
}
