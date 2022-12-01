import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { CreateComponent } from './create/create.component';

import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  {
    path: 'create',
    component: CreateComponent,
    loadChildren: () => import('./create/create.module').then(m => m.CreateModule)
  },
  {
    path: ':courseId/edit',
    component: EditComponent,
    loadChildren: () => import('./edit/edit.module').then(m => m.EditModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
