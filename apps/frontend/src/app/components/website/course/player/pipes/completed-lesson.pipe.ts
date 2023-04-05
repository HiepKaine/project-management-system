import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'completedLesson',
  pure: false
})
export class CompletedLessonPipe implements PipeTransform {

  transform(value: any[], lesson: any): boolean {
    return value.some(item => item.lessonId === lesson.id);
  }

}
