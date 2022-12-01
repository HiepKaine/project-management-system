import { plainToInstance, Transform, Type } from "class-transformer";
import { Lesson } from "./lesson.model";

export class CourseChapter {
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
  @Type(() => Lesson)
  @Transform(({ value }) => Array.isArray(value.data) && value.data.length > 0 ? value.data.map((item: Lesson) => plainToInstance(Lesson, item)) : [])
  lessons!: Lesson[];
}
