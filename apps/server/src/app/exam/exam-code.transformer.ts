import { plainToInstance, Transform } from "class-transformer";
import { ExamTransformer } from "./exam.transformer";
import { QuestionTransformer } from "./question.transformer";

export class ExamCodeTransformer {
  examId: number;

  @Transform(({ value }) => {
    if (value && value.data) {
      return value;
    } else {
      return value && Array.isArray(value) ? ({ data: value.map(item => plainToInstance(QuestionTransformer, item)) }) : { data: [] }
    }
  })
  questions!: { data: QuestionTransformer[] };

  @Transform(({ value }) => {
    if (value && value.data) {
      return value;
    } else {
      return { data: plainToInstance(ExamTransformer, value) };
    }
  })
  exam!: { data: ExamTransformer };
}
