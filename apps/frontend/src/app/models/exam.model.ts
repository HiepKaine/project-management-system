import { plainToInstance, Transform, Type } from "class-transformer";
import { Question } from "./question.model";

export class Exam {
  id!: number;
  name!: string;
  categoryId!: number;
  duration!: number;
  retry!: number;
  referencePoint!: number;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Question)
  @Transform(({ value }) => Array.isArray(value) && value.length > 0 ? value.map((item: Question) => plainToInstance(Question, item)) : [])
  questions!: Question[];

  getQuestionCount(): number {
    return Array.isArray(this.questions) ? this.questions.length : 0;
  }
}
