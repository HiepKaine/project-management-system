import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { IconDefinition } from '@ant-design/icons-angular';
import { LockOutline, UndoOutline, LeftOutline, RightOutline, CheckSquareOutline, MinusSquareOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LessonComponent } from './lesson/lesson.component';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import { FormsModule } from '@angular/forms';
import { CompletedLessonPipe } from './pipes/completed-lesson.pipe';
const icons: IconDefinition[] = [LockOutline, UndoOutline, LeftOutline, RightOutline, CheckSquareOutline, MinusSquareOutline];
@NgModule({
  declarations: [LessonComponent, PlayerComponent, CompletedLessonPipe],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    NzCollapseModule,
    NzButtonModule,
    NzCheckboxModule,
    FormsModule,
    NzIconModule.forChild(icons)
  ],
})
export class PlayerModule { }
