import { plainToInstance, Transform } from "class-transformer";
import { QuestionTransformer } from "./question.transformer";

export class ExamTransformer {
  name: string
  categoryId: number
  duration: number
  retry: number
  referencePoint: number
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => {
    if (Array.isArray(value) && value.length > 0) {
      return value.map(item => plainToInstance(QuestionTransformer, item));
    } else {
      return [];
    }
  })
  questions!: QuestionTransformer[];
}
