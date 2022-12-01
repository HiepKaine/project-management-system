import { plainToInstance, Transform, Type } from "class-transformer";
import { Exam } from "./exam.model";

export class ExamPack {
  id!: number;
  name!: string;
  lecturer!: string;
  video!: string;
  price!: number;
  originalPrice!: number;
  isFree!: boolean;
  categoryId!: number;
  rateCount!: number;
  rateAverage!: number;
  image!: string;
  status!: number;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => Exam)
  @Transform(({ value }) => Array.isArray(value) && value.length > 0 ? value.map((item: Exam) => plainToInstance(Exam, item)) : [])
  exams!: Exam[];

  getExamCount(): number {
    return Array.isArray(this.exams) ? this.exams.length : 0;
  }

  getPriceText(): string {
    if (this.price === 0) {
      return 'Miễn phí';
    } else {
      return this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    }
  }

  getOriginalPriceText(): string {
    if (this.originalPrice === 0) {
      return '';
    } else {
      return this.originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    }
  }
}
