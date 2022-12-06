import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxFormManager, NgxFormrAnchorComponent } from '@ngxform/platform';
import { NotificationService } from '@shared/components/notification/notification.service';
import { TextControlComponent } from '@webpress/form';
import { ContactFormService } from '../contact-form.service';

@Component({
  selector: 'app-contact-form-modal',
  templateUrl: './contact-form-modal.component.html',
  styleUrls: ['./contact-form-modal.component.scss'],
})
export class ContactFormModalComponent implements OnInit {
  @Input() type!: number;
  @Input() content!: string;
  public form: UntypedFormGroup = this.fb.group({
    name: new UntypedFormControl('', [Validators.required, Validators.maxLength(255)]),
    phone: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]*$/),
      Validators.minLength(9),
      Validators.maxLength(10),
    ]),
    email: new UntypedFormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(255),
    ]),
    position: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    organization: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
  });

  @ViewChild('formInputs', { static: true })
  formInputs!: NgxFormrAnchorComponent;

  constructor(
    private fb: UntypedFormBuilder,
    private ngxFormManager: NgxFormManager,
    private contactFormService: ContactFormService,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    const ngxForm = this.ngxFormManager.init(this.form, {
      name: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Họ tên ',
          className: ['col-12', 'col-sm-6'],
        },
      },
      phone: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Số điện thoại',
          className: ['col-12', 'col-sm-6'],
        },
      },
      email: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Email',
          className: ['col-12'],
        },
      },
      position: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Vị trí ứng tuyển',
          className: ['col-12', 'col-sm-6'],
        },
      },
      organization: {
        component: TextControlComponent,
        option: {
          nzSize: 'large',
          type: 'text',
          label: 'Cơ quan ứng tuyển',
          className: ['col-12', 'col-sm-6'],
        },
      },
    });

    this.ngxFormManager.render(ngxForm, this.formInputs.viewContainerRef);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.ngxFormManager.markAllAsDirty(this.form);
    } else {
      const data = {
        name: this.form.get('name')?.value,
        phone: this.form.get('phone')?.value,
        email: this.form.get('email')?.value,
        position: this.form.get('position')?.value,
        organization: this.form.get('organization')?.value,
        type: this.type,
        content: this.content,
      };
      this.contactFormService.create(data).subscribe(() => {
        this.modal.openModals[0]?.triggerOk();
        this.notificationService.success(
          this.translate.instant('success.title'),
          'Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất',
          { nzDuration: 3000 }
        );
      });
    }
  }
}
