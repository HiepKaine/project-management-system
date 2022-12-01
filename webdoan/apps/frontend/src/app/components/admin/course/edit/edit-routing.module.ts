import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCourseHighlightComponent } from './edit-course-highlight/edit-course-highlight.component';
import { EditCourseLessonComponent } from './edit-course-lesson/edit-course-lesson.component';
import { EditCourseRelatedComponent } from './edit-course-related/edit-course-related.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { ListCourseReviewComponent } from '../list/list-course-review/list-course-review.component';

const routes: Routes = [
  { path: '', component: EditCourseComponent },
  { path: 'lesson', component: EditCourseLessonComponent },
  { path: 'highlight', component: EditCourseHighlightComponent },
  { path: 'related', component: EditCourseRelatedComponent },
  { path: 'review', component: ListCourseReviewComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
