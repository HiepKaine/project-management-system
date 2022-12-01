import { Question } from "@frontend/models/question.model";

export interface ExamQuestionItem {
  readingContentId: number | null,
  label: string,
  data: Question | Question[],
  startAt: number,
  endAt: number,

}
