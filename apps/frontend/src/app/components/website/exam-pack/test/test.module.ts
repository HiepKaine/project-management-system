import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { FormsModule } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CountdownModule } from 'ngx-countdown';
import { QuestionComponent } from './question/question.component';
import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { UserOutline } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { GroupByReadingQuestionPipe } from './pipes/group-by-reading-question.pipe';
import { IsArrayPipe } from './pipes/is-array.pipe';

const icons: IconDefinition[] = [UserOutline];

@NgModule({
  declarations: [TestComponent, QuestionComponent, GroupByReadingQuestionPipe],
  imports: [
    CommonModule,
    TestRoutingModule,
    NzBreadCrumbModule,
    NzPaginationModule,
    NzButtonModule,
    FormsModule,
    NzRadioModule,
    NzAvatarModule,
    NzModalModule,
    CountdownModule,
    NzIconModule.forChild(icons),
    IsArrayPipe,
  ],
})
export class TestModule { }
