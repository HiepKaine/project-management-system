import { plainToInstance, Transform, Type } from "class-transformer";
import { Category } from "./category.model";

export class Lesson {
  id!: number;
  name!: string;
  categoryId!: number;
  description!: string;
  link!: string;
  slug!: string;
  status!: number;
  deletedAt!: Date;
  createdAt!: Date;
  updatedAt!: Date;


  @Type(() => Category)
  @Transform(({ value }) => value ? plainToInstance(Category, value) : null)
  category!: Category;
}
