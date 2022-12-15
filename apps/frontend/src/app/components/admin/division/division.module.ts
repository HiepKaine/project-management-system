import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionRoutingModule } from './division-routing.module';
import { CreateDivisionModalComponent } from './create-division-modal/create-division-modal.component';
import { EditDivisionModalComponent } from './edit-division-modal/edit-division-modal.component';
import { ListDivisionComponent } from './list-division/list-division.component';

@NgModule({
  declarations: [
    CreateDivisionModalComponent,
    EditDivisionModalComponent,
    ListDivisionComponent,
  ],
  imports: [CommonModule, DivisionRoutingModule],
})
export class DivisionModule {}
