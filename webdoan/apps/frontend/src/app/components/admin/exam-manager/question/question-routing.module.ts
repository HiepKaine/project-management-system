import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  CreateMultipleChoiceComponent,
} from './create-multiple-choice/create-multiple-choice.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: 'create', component: CreateMultipleChoiceComponent },
  { path: 'import', component: ImportComponent },
  { path: ':questionId/edit', component: EditComponent },
  { path: '', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule { }
