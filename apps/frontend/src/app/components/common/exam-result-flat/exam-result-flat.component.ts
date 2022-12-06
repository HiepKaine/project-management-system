import { Component, Input } from '@angular/core';
import { TestSession } from '@frontend/models/test-session.model';

@Component({
  selector: 'app-exam-result-flat',
  templateUrl: './exam-result-flat.component.html',
  styleUrls: ['./exam-result-flat.component.scss'],
})
export class ExamResultFlatComponent {
  @Input() testSession!: TestSession;

  checkChoseAnswer(answerId: number): boolean {
    const choseAnswer = this.testSession.testSessionAnswers.find(
      (item) => item.answerId === answerId
    );
    return choseAnswer ? true : false;
  }

  isCorrect(questionId: number): string {
    const question = this.testSession.examCode.questions.find(
      (item) => item.id === questionId
    );
    const userAnswer = this.testSession.testSessionAnswers.find(
      (item) => item.questionId === questionId
    );
    if (userAnswer && question) {
      const correctAnswer = question.answers.find((item) => item.isCorrect);
      if (correctAnswer && correctAnswer.id === userAnswer.answerId) {
        return 'correctQuestion';
      } else {
        return 'inCorrectQuestion';
      }
    } else {
      return 'skipQuestion';
    }
  }

  handleCheckAnswer(result: string): string {
    if (result === 'correctQuestion') {
      return 'Đáp án bạn chọn là đáp án đúng';
    } else if (result === 'inCorrectQuestion') {
      return 'Đáp án bạn chọn là đáp án sai';
    } else {
      return 'Bạn đã không chọn đáp án.';
    }
  }
}
