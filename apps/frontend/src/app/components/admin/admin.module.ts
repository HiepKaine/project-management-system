import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxAdminModule } from '@frontend/theme';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateDivisionModalComponent } from './create-division-modal/create-division-modal.component';

@NgModule({
  declarations: [AdminComponent, CreateDivisionModalComponent],
  imports: [CommonModule, AdminRoutingModule, NgxAdminModule],
})
export class AdminModule {}
