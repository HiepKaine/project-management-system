import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ResultRoutingModule } from './result-routing.module';

import { IconDefinition } from '@ant-design/icons-angular';
import { EyeFill, WarningOutline } from '@ant-design/icons-angular/icons';
import { ResultComponent } from './result.component';
import { ResultService } from './result.service';
const icons: IconDefinition[] = [WarningOutline, EyeFill];

@NgModule({
  declarations: [ResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    ResultRoutingModule,
    NzButtonModule,
    NzPaginationModule,
    NzIconModule.forChild(icons),
  ],
  providers: [ResultService],
})
export class ResultModule { }
