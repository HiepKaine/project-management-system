import { plainToInstance, Transform } from "class-transformer";
import { CourseChapterTransformer } from "./course-chapter.transformer";

export class CourseTransformer {
  id: number;
  name: string;
  lecturer: string;
  image: string;
  video: string;
  categoryId: number;
  description: string;
  isFreeCourse: boolean;
  originalPrice: string;
  rateCount: number;
  rateAverage: number;
  price: number;
  status: number;
  type: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => {
    if (value && value.data) {
      return value;
    } else {
      return value && Array.isArray(value) ? ({ data: value.map(item => plainToInstance(CourseChapterTransformer, item)) }) : { data: [] };
    }
  })
  courseChapters!: { data: CourseChapterTransformer[] };
}
