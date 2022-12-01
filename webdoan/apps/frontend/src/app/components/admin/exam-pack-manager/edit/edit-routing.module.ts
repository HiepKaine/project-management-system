import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExamPackHighlightComponent } from './edit-exam-pack-highlight/edit-exam-pack-highlight.component';
import { EditExamPackExamComponent } from './edit-exam-pack-exam/edit-exam-pack-exam.component';
import { EditExamPackComponent } from './edit-exam-pack/edit-exam-pack.component';
import { EditComponent } from './edit.component';
import { EditExamPackRelatedComponent } from './edit-exam-pack-related/edit-exam-pack-related.component';
import { ListExamPackReviewComponent } from '../list/list-exam-pack-review/list-exam-pack-review.component';

const routes: Routes = [
  {
    path: '',
    component: EditComponent,
    children: [
      { path: '', component: EditExamPackComponent },
      { path: 'exam', component: EditExamPackExamComponent },
      { path: 'highlight', component: EditExamPackHighlightComponent },
      { path: 'related', component: EditExamPackRelatedComponent },
      { path: 'review', component: ListExamPackReviewComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
