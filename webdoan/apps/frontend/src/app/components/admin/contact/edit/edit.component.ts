import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { plainToInstance } from 'class-transformer';

import { ApiItemResponse } from '@frontend/common';
import { Contact } from '@frontend/models/contact.model';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  NgxFormManager,
  NgxFormrAnchorComponent,
} from '@ngxform/platform';
import {
  NotificationService,
} from '@shared/components/notification/notification.service';
import { RadioControlComponent, TextareaControlComponent, TextControlComponent } from '@webpress/form';

import { ContactService } from '../contact.service';

@UntilDestroy()
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public contactId!: number;
  public contact!: Contact;
  public editContactForm: UntypedFormGroup = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    status: new FormControl(1, [Validators.required]),
    content: new FormControl('', []),
    organization: new FormControl('', []),
    position: new FormControl('', []),
  });

  @ViewChild('formInputs', { static: true }) formInputs!: NgxFormrAnchorComponent;


  constructor(
    private ngxFormManager: NgxFormManager,
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {
    this.contactId = Number(this.activatedRoute.snapshot.params['id']);
    this.contactService.show(this.contactId).subscribe((result: ApiItemResponse<Contact>) => {
      this.contact = plainToInstance(Contact, result.data);
      this.editContactForm.setValue({
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone,
        status: this.contact.status,
        content: this.contact.content,
        organization: this.contact.organization,
        position: this.contact.position,
      });
    })
  }

  ngOnInit(): void {
    this.ngxFormManager.watch('editContactForm', this.editContactForm);
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
          className: ['col-12',]
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
          className: ['col-12',],
          nzOptions: [{ label: 'Đã liên hệ', value: 1 }, { label: 'Chưa liên hệ', value: 0 }]
        }
      },
    })
    this.ngxFormManager.render('editContactForm', this.formInputs.viewContainerRef);
  }

  onSubmit() {
    if (this.editContactForm.valid) {
      this.contactService.update(this.contactId, {
        name: this.editContactForm.get('name')?.value,
        email: this.editContactForm.get('email')?.value,
        phone: this.editContactForm.get('phone')?.value,
        status: this.editContactForm.get('status')?.value,
        content: this.editContactForm.get('content')?.value,
        organization: this.editContactForm.get('organization')?.value,
        position: this.editContactForm.get('position')?.value,
      }).subscribe(() => {
        this.notificationService.success(this.translate.instant('success.title'), this.translate.instant('success.update'), { nzDuration: 3000 });
      })
    } else {
      this.ngxFormManager.markAllAsDirty(this.editContactForm);
    }
  }
}
