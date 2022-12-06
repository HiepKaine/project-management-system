import { Pipe, PipeTransform } from '@angular/core';
import { Lesson } from '@frontend/models/lesson.model';
import { CompletedLesson } from '@frontend/models/completed-lesson.model';

@Pipe({
  name: 'completedLesson',
  pure: false
})
export class CompletedLessonPipe implements PipeTransform {

  transform(value: CompletedLesson[], lesson: Lesson): boolean {
    return value.some(item => item.lessonId === lesson.id);
  }

}
