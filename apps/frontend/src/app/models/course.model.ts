import { plainToInstance, Transform, Type } from "class-transformer";
import { CourseChapter } from "./course-chapter.model";

export class Course {
  id!: number;
  name!: string;
  lecturer!: string;
  video!: string;
  categoryId!: number;
  image!: string;
  description!: string;
  isFreeCourse!: boolean;
  price!: number;
  originalPrice!: number;
  rateCount!: number;
  rateAverage!: number;
  status!: number;
  type!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;

  @Type(() => CourseChapter)
  @Transform(({ value }) => Array.isArray(value.data) && value.data.length > 0 ? value.data.map((item: CourseChapter) => plainToInstance(CourseChapter, item)) : [])
  courseChapters!: CourseChapter[];

  public getLessonCount(): number {
    let count = 0;
    if (Array.isArray(this.courseChapters)) {
      for (let i = 0; i < this.courseChapters.length; i++) {
        count += this.courseChapters[i].lessons.length;
      }
    }
    return count;
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
