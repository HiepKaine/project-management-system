import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteComponent } from './website.component';
import { WebsiteRoutingModule } from './website-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [WebsiteComponent, DashboardComponent],
  imports: [CommonModule, WebsiteRoutingModule],
})
export class WebsiteModule {}
