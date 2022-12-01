import { plainToInstance, Transform } from "class-transformer";
import { CategoryTransformer } from "../category/category.transformer";

export class LessonTransformer {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  link: string;
  createdAt: Date;
  updatedAt: Date;

  @Transform(({ value }) => {
    if (value instanceof CategoryTransformer) {
      return value;
    } else {
      return plainToInstance(CategoryTransformer, value)
    }
  })
  category: CategoryTransformer;
}
