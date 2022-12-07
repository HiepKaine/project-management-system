import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateFacultyModalComponent } from './create-faculty-modal/create-faculty-modal.component';
import { EditComponent } from './edit/edit.component';
import { FacultyRoutingModule } from './faculty-routing.module';

@NgModule({
  declarations: [ListComponent, CreateFacultyModalComponent, EditComponent],
  imports: [CommonModule, FacultyRoutingModule],
})
export class FacultyModule {}
