import { EditExamComponent } from './edit-exam/edit-exam.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';
import { EditExamQuestionComponent } from './edit-exam-question/edit-exam-question.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      { path: '', component: EditExamComponent },
      { path: 'question', component: EditExamQuestionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
