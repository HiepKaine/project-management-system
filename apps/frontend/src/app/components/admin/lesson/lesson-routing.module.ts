import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLessonComponent } from './create-lesson/create-lesson.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'create', component: CreateLessonComponent },
  { path: ':lessonId/edit', component: EditComponent },
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
