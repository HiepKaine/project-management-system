import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListScoreComponent } from './list-score/list-score.component';

const routes: Routes = [{ path: '', component: ListScoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoreRoutingModule {}
