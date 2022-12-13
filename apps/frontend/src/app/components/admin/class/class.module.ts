import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClassModalComponent } from './create-class-modal/create-class-modal.component';
import { EditClassModalComponent } from './edit-class-modal/edit-class-modal.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    CreateClassModalComponent,
    EditClassModalComponent,
    ListComponent,
  ],
  imports: [CommonModule],
})
export class ClassModule {}
