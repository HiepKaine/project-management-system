import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

const routes: Routes = [
  { path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule) },
  { path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionModule) },
  { path: 'reading-content', loadChildren: () => import('./reading-content/reading-content.module').then(m => m.ReadingContentModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamManagerRoutingModule { }
