import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgxFormModule } from '@ngxform/platform';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form.component';
import { ContactFormModalComponent } from './contact-form-modal/contact-form-modal.component';
import { ContactFormService } from './contact-form.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactFormComponent, ContactFormModalComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NgxFormModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
  ],
  providers: [ContactFormService],
  exports: [ContactFormComponent]
})
export class ContactFormModule { }
