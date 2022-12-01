import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { DashboardComponent } from './dashboard.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NgChartsModule } from 'ng2-charts';
import { NgxFormModule } from '@ngxform/platform';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzTableModule,
    NzSelectModule,
    NzFormModule,
    NzCheckboxModule,
    NgChartsModule,
    NgxFormModule,
  ],
})
export class DashboardModule {}
