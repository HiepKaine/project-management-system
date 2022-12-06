import { plainToInstance, Transform } from "class-transformer";
import { ExamTransformer } from "../exam/exam.transformer";

export class ExamPackTransformer {
  id: number;
  name: string;
  lecturer: string;
  video: string;
  price: number;
  image: string;
  originalPrice: number;
  status: number;
  rateCount: number;
  rateAverage: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  @Transform(({ value }) => {
    if (Array.isArray(value) && value.length > 0) {
      return value.map(item => plainToInstance(ExamTransformer, item));
    } else {
      return [];
    }
  })
  exams!: ExamTransformer[];
}
