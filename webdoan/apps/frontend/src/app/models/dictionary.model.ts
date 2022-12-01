import { plainToInstance, Transform, Type } from 'class-transformer';
import { Category } from './category.model';
import { Option } from './option.model';
import { Slide } from './slide.model';

export class Dictionary {
  @Type(() => Category)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: Category) => plainToInstance(Category, item))
      : []
  )
  category!: Category[];
  @Type(() => Slide)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: Slide) => plainToInstance(Category, item))
      : []
  )
  slider!: Slide[];
  @Type(() => Option)
  @Transform(({ value }) =>
    Array.isArray(value) && value.length > 0
      ? value.map((item: Option) => plainToInstance(Option, item))
      : []
  )
  option!: Option[];
}
