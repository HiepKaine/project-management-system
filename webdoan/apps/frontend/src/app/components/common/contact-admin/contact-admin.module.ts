import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactAdminComponent } from './contact-admin.component';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [ContactAdminComponent],
  imports: [CommonModule, NzButtonModule],
  exports: [ContactAdminComponent],
})
export class ContactAdminModule {}
