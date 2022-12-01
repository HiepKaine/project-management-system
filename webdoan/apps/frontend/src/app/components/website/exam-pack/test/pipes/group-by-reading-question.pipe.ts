import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '@frontend/models/question.model';

@Pipe({
  name: 'groupByReadingQuestion'
})
export class GroupByReadingQuestionPipe implements PipeTransform {

  transform(value: Question[]): Question[] | Array<Question[]> {
    console.log(value);
    return value;
  }

}
