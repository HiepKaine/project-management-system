import { ReadingContentQuestionComponent } from './reading-content-question/reading-content-question.component';
import { EditReadingContentComponent } from './edit-reading-content/edit-reading-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      { path: '', component: EditReadingContentComponent },
      { path: 'question', component: ReadingContentQuestionComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
