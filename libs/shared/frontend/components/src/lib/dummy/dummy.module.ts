import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DummyRoutingModule } from './dummy-routing.module';
import { DummyComponent } from './dummy.component';

@NgModule({
  declarations: [DummyComponent],
  imports: [
    CommonModule,
    DummyRoutingModule
  ]
})
export class DummyModule { }
