import { plainToInstance, Transform } from "class-transformer";
import { LessonTransformer } from "../lesson/lesson.transformer";

export class CourseChapterTransformer {
  id: number;
  name: string;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => {
    if (value && value.data) {
      return value;
    } else {
      return value && Array.isArray(value) ? ({ data: value.map(item => plainToInstance(LessonTransformer, item)) }) : { data: [] };
    }
  })
  lessons!: { data: LessonTransformer[] };
}
