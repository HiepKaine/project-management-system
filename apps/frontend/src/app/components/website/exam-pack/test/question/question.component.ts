import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Answer } from '@frontend/models/answer.model';
import { Question } from '@frontend/models/question.model';
import { ExamQuestionItem } from './../types';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnChanges {
  @Input() data!: ExamQuestionItem;

  @Input() qIndex!: number;

  @Input() selectedAnswers: Map<number, Answer> = new Map<number, Answer>();

  @Output() answer = new EventEmitter<{ question: Question, answer: Answer }>();

  public answerCharacters = ['A', 'B', 'C', 'D'];

  public question!: Question;
  public readingContentQuestions!: Question[];

  ngOnChanges(): void {
    if (Array.isArray(this.data.data)) {
      this.question = this.data.data[0];
      this.readingContentQuestions = this.data.data;
    } else {
      this.question = this.data.data;
      this.readingContentQuestions = [];
    }
    console.log(this.question);
  }

  choseAnswer(question: Question, answer: Answer) {
    this.answer.emit({ question, answer })
  }


  isSelected(q: Question, a: Answer): boolean {
    return this.selectedAnswers.get(q.id) === a;
  }
}
